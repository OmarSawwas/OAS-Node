import { ErrorConstants } from "../../../constants";
import { Roles, User } from "../../../types";
import { signJwt } from "../../../utils";
import { LoginInput, LoginResponse } from "../types";
import * as bcrypt from "bcryptjs";
class AuthenticationServices {
  // For sure he we are just demonstrating instead of using a database adding some static data!
  users = [
    {
      id: 1,
      name: "John Doe",
      role: Roles.EMPLOYEE,
      email: "john.doe@gmail.com",
      password: "$2a$10$fk7FxVKC2N5w8sun3SMbKu5kRtithbbeQemlCMasvEe7zS1B/Tf4S", // 123123123 password which will be hashed using bcrypt package!
    },
    {
      id: 2,
      name: "John Doe",
      role: Roles.MANAGER,
      email: "john.doe@gmail.com",
      password: "$2a$10$fk7FxVKC2N5w8sun3SMbKu5kRtithbbeQemlCMasvEe7zS1B/Tf4S",
    },
  ];
  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const { email, password } = input;
      const userFound = this.users.find((item) => item.email === email);
      if (!userFound) {
        return {
          error: ErrorConstants["WRONG_CREDENTIALS"],
          statusCode: 401,
          token: null,
        };
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userFound.password!
      );

      if (!isPasswordMatch) {
        return {
          error: ErrorConstants["WRONG_CREDENTIALS"],
          statusCode: 401,
          token: null,
        };
      }

      const { password: neglectedPassword, ...rest } = userFound;
      const token = await signJwt(rest);
      return {
        error: null,
        statusCode: 200,
        token: token,
      };
    } catch (error) {
      const err = error as Error;
      // console.log({err}) you can here handle the error maybe using your special logger system using winston for example!
      return {
        error: ErrorConstants["INTERNAL_SERVER_ERROR"],
        statusCode: 500,
        token: null,
      };
    }
  }
}
export default AuthenticationServices;
