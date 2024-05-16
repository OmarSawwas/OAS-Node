import { ServerResponse } from "http";

export interface ISpecialResponse extends ServerResponse {
  sendFile: (path: string, mime: string) => any;
  json: (data: any) => any;
  status: (code: number) => any;
}
