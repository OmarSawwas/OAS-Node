import { ErrorConstants } from "../../../constants";
import { Roles } from "../../../types";
import { AllUsersResponse } from "../types";
class UserServices {
  users = [
    {
      id: 1,
      name: "John Doe",
      role: Roles.EMPLOYEE,
      email: "john.doe@gmail.com",
    },
    {
      id: 2,
      name: "John Doe",
      role: Roles.MANAGER,
      email: "john.doe2@gmail.com",
    },
  ];
  async getAllUser(): Promise<AllUsersResponse> {
    try {
      return {
        error: null,
        statusCode: 200,
        users: this.users,
      };
    } catch (error) {
      const err = error as Error;
      // console.log({err}) you can here handle the error maybe using your special logger system using winston for example!
      return {
        error: ErrorConstants["INTERNAL_SERVER_ERROR"],
        statusCode: 500,
        users: [],
      };
    }
  }
}
export default UserServices;
