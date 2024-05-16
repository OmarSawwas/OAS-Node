import * as fs from "fs/promises";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { pipeline } from "stream";
import { MergedRoutes } from "./routes";
import {
  HttpMethods,
  ISpecialResponse,
  Roles,
  Route,
  SpecialRequest,
} from "./types";
import { signJwt, VerifyToken } from "./utils";
import { ErrorConstants } from "./constants";

class OASNode {
  // Defining the class varriables
  server: Server;
  routes: { [key: string]: any };
  staticRoutes: Route[];
  middleware: any[];
  routeFound: Route | undefined;

  //   Defining the class constructor
  constructor(appRoutes: Route[]) {
    this.staticRoutes = appRoutes;
    this.server = createServer();
    this.routes = {};
    this.middleware = [];
    this.routeFound = undefined;

    this.server.on(
      "request",
      (request: SpecialRequest, response: ISpecialResponse) => {
        this.routeFound = undefined;
        // todo: Validation
        // todo: Middlewares
        // < --------------------- Defining Response repetitive functions started --------------------- >
        // Send a file back to the client whenever res.sendFile is called!
        response.sendFile = async (path: string, mime: string) => {
          // Sending a file implementing the logic of read stream and pipeline method!
          const fileHandle = await fs.open(path, "r");
          const fileStream = fileHandle.createReadStream();
          response.setHeader("Content-Type", mime);
          pipeline(fileStream, response);
        };

        response.json = (data: any) => {
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(data));
        };

        response.status = (code: number) => {
          response.statusCode = code;
          return response;
        };

        // < --------------------- Defining Response repetitive functions ended --------------------- >
        // Handling the app when no routes are added!
        if (this.staticRoutes.length === 0) {
          return response?.status(200)?.json({
            warning: `Server is running but you didnt add yet any route!`,
          });
        }
        // Handling the app when the called url is not one of registered routes!
        this.routeFound = MergedRoutes.find(
          (item) => item.endPoint === request.url
        );
        if (!this.routeFound) {
          return response.status(404).json(ErrorConstants["ROUTE_NOT_FOUND"]);
        }

        if (!request.method) {
          return response.status(400).json(ErrorConstants["WRONG_HTTP_METHOD"]);
        }
        // Logic here is instead of blocking the whole api or causing trash data..., to turn off specific routes that we need to work that may be having some security vulnerabilities or some other technical issue.Which could be done easily making the underMaintenance boolean true for that route!
        if (this.routeFound.underMaintenance === true) {
          return response
            .status(404)
            .json(ErrorConstants["ROUTE_UNDER_MAINTENANCE"]);
        }

        // User extracted from the token if the token is valid ( this line checks at the same time if the token is valid and who is the user)!
        const user = VerifyToken(request);
        // If user is null or if the user's role is not one of the allowed route roles then we should reject the request!

        if (
          !user ||
          (this.routeFound.isPrivate === true &&
            !this.routeFound.roles.find((item) => item === user.role))
        ) {
          return response.status(401).json(ErrorConstants["AUTHORIZED_ONLY"]);
        }

        const callback =
          this.routes[request.method.toLowerCase() + request.url];

        if (!callback) {
          {
            return response
              .status(404)
              .json({ error: `Cannot ${request.method} ${request.url}` });
          }
        }

        // Run all the middleware functions before we run the corresponding route using our special recursion algorithm!
        const runMiddleware = (
          req: SpecialRequest,
          res: ISpecialResponse,
          middleware: any,
          index: number
        ) => {
          // Out exit point...
          if (index === middleware.length) {
            if (!req.method) {
              return response
                .status(400)
                .json(ErrorConstants["WRONG_HTTP_METHOD"]);
            }
            // If the routes object does not have a key of req.method + req.url, return 404
            if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
              return res
                .status(404)
                .json({ error: `Cannot ${req.method} ${req.url}` });
            }

            this.routes[req.method.toLowerCase() + req.url](req, res);
          } else {
            middleware[index](req, res, () => {
              runMiddleware(req, res, middleware, index + 1);
            });
          }
        };

        runMiddleware(request, response, this.middleware, 0);
      }
    );
  }

  //   Route: Class Method to allow adding route to the
  //   Adding items to the object such that key is the http method concatenated with the endpoint for example: post/api/users, and the value is the callback function.
  route(method: HttpMethods, endPoint: string, cb: any) {
    this.routes[method + endPoint] = cb;
  }

  beforeEach(cb: any) {
    this.middleware.push(cb);
  }

  getCurrentRoute() {
    return this.routeFound;
  }

  //   Listen: Class Method To make the server listen to specific port.
  //   With the ability of sending any callback and running it whenever the server successfully listens!
  listen(port: number, cb: () => void) {
    try {
      if (!port || port < 0) throw new Error("Wrong port number!");
      this.server.listen(port, () => {
        cb();
      });
    } catch (error) {
      console.log({ error });
    }
  }
}
export default OASNode;
