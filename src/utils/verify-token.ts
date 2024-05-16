import { Roles, User } from "../types";

import { verifyJwt } from "./jwt";
import { IncomingMessage } from "http";

const VerifyToken = (request: IncomingMessage): User | null => {
  const fullToken = request.headers["authorization"];

  if (fullToken) {
    const bearer = /[Bb]earer\s+(.*)$/.exec(fullToken);
    if (!bearer) {
      return null;
    }
    const token = bearer[1];
    const user = verifyJwt(token);

    if (!user) {
      return null;
    } else {
      return user as User;
    }
  }

  return null;
};
export default VerifyToken;
