import { IncomingMessage } from "http";

export interface SpecialRequest extends IncomingMessage {
  body?: any;
}
