import { BasicResponse, User } from "../../../../types";

export interface AllUsersResponse extends BasicResponse {
  users: User[];
}
