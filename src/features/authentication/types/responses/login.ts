import { BasicResponse } from "../../../../types";

export interface LoginResponse extends BasicResponse {
  token: string | null;
}
