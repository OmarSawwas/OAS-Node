import {
  HttpMethods,
  ISpecialResponse,
  Roles,
  Route,
  SpecialRequest,
} from "../../../types";
import { IncomingMessage } from "http";
import { UserServices } from "../services";
const userServices = new UserServices();

const UserRoutes: Route[] = [
  {
    isPrivate: true,
    roles: [Roles.ADMIN, Roles.MANAGER],
    endPoint: "/users",
    fieldsValidation: [],
    underMaintenance: false,
    method: HttpMethods.GET,
    // here we can either write the callbacks inline / in files (as services class) and import!
    cb: async (request: SpecialRequest, response: ISpecialResponse) => {
      const res = await userServices.getAllUser();
      const { statusCode, ...rest } = res;
      response.status(statusCode).json(rest);
    },
  },
];
export default UserRoutes;
