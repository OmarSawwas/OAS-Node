export interface FieldError {
  field: string;
  message: string;
}

export interface BasicResponse {
  error: FieldError | null;
  statusCode: number;
}
