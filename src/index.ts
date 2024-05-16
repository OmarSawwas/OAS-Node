import { ServerResponse } from "http";
// Importing our custom framework
import { ErrorConstants } from "./constants";
import OASNode from "./oasnode";
import { MergedRoutes } from "./routes";
import { ISpecialResponse, Route, SpecialRequest } from "./types";
// Change the port to you custom port!
const PORT = 4000;
// Creating a server instance of our class created!
const server = new OASNode(MergedRoutes);

const parseJSON = (req: SpecialRequest, res: ServerResponse, next: any) => {
  // This is only good for bodies that their size is less than the highWaterMark value
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });

    req.on("end", () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
};
// Could be later implemented to be built in middleware!
const validateInputs = (
  req: SpecialRequest,
  res: ISpecialResponse,
  next: any
) => {
  const route: Route = server.getCurrentRoute()!;
  const { fieldsValidation } = route;

  if (fieldsValidation.length > 0) {
    const body = req.body;
    if (!body) {
      return res.status(400).json(ErrorConstants["WRONG_INPUT"]);
    }
    for (let item of fieldsValidation) {
      const { defaultValue, field, required, check } = item;
      const matchedField = body[field];
      if (!matchedField && required === true) {
        return res.status(400).json(ErrorConstants["WRONG_INPUT"]);
      }

      if (check) {
        const error = check(matchedField).error;
        if (error) {
          return res.status(400).json(error);
        }
      }
    }
    next();
  } else {
    next();
  }
};

// For parsing JSON body
server.beforeEach(parseJSON);

// For Validating inputs
server.beforeEach(validateInputs);

// Triggering the server to listen to the specified port!
server.listen(PORT, () => {
  // Here you can send whatever callback function when server starts listening for example you can connect to db.
  console.log(`🚀 Server listening to port ${PORT}`);
});
// Creating the routes that we have!!
MergedRoutes.forEach((item) => {
  server.route(item.method, item.endPoint, item.cb);
});
