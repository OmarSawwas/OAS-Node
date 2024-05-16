import {
  HttpMethods,
  ISpecialResponse,
  Roles,
  Route,
  SpecialRequest,
} from "../../../types";
import { IncomingMessage } from "http";
import { AuthenticationServices } from "../services";
import { LoginInput } from "../types";
import { ErrorConstants } from "../../../constants";
import { isEmail } from "class-validator";
const authServices = new AuthenticationServices();

const AuthenticationRoutes: Route[] = [
  {
    isPrivate: false,
    roles: [],
    endPoint: "/sign-in",
    fieldsValidation: [
      {
        field: "email",
        required: true,
        defaultValue: "",
        check: (input: any) => {
          if (!input || input === "") {
            return {
              error: ErrorConstants["WRONG_EMAIL"],
            };
          }

          if (input.length < 8 || input.length > 50) {
            return {
              error: ErrorConstants["WRONG_EMAIL"],
            };
          }
          if (!isEmail(input)) {
            return {
              error: ErrorConstants["WRONG_EMAIL"],
            };
          }
          return { error: null };
        },
      },
      {
        field: "password",
        required: true,
        check: (input: any) => {
          if (!input || input === "") {
            return {
              error: ErrorConstants["WRONG_PASSWORD"],
            };
          }

          if (input.length < 8 || input.length > 50) {
            return {
              error: ErrorConstants["WRONG_PASSWORD"],
            };
          }
          return { error: null };
        },
      },
    ],
    underMaintenance: false,
    method: HttpMethods.POST,
    // here we can either write the callbacks inline / in files (as services class) and import!
    cb: async (request: SpecialRequest, response: ISpecialResponse) => {
      const res = await authServices.login(request.body);
      const { statusCode, ...rest } = res;
      response.status(statusCode).json(rest);
    },
  },
];
export default AuthenticationRoutes;
