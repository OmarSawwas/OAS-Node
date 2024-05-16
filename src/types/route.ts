import { FieldError } from "./common-response";
import { Roles, HttpMethods } from "./enums";
type CallbackFunction<T = any, R = any> = (...args: T[]) => R;

type CheckCallBack<R = { error: null | FieldError }> = (...args: any[]) => R;
interface fieldsValidation {
  field: string;
  required: boolean;
  defaultValue?: any;
  check?: CheckCallBack;
}

export interface Route {
  isPrivate: boolean;
  roles: Roles[];
  endPoint: string;
  underMaintenance: boolean;
  method: HttpMethods;
  cb: CallbackFunction;
  fieldsValidation: fieldsValidation[];
}
