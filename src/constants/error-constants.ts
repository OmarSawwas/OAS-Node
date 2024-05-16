const ErrorConstants = {
  INTERNAL_SERVER_ERROR: {
    field: "Internal Server Error",
    message: "Something went wrong, please contact system administrator.",
  },
  AUTHORIZED_ONLY: {
    field: "Token",
    message:
      "This operation is allowed only for authorized users of sepecific role!",
  },
  ROUTE_NOT_FOUND: {
    field: "Endpoint",
    message: "Endpoint requested is not found!",
  },
  ROUTE_UNDER_MAINTENANCE: {
    field: "Endpoint",
    message: "Endpoint is currently under maintenance!",
  },
  WRONG_HTTP_METHOD: {
    field: "Method",
    message: "Wrong http method!",
  },
  WRONG_CREDENTIALS: {
    field: "Email/Password",
    message: "Wrong login credentials!",
  },
  WRONG_INPUT: {
    field: "Body",
    message: "Wrong body input!",
  },
  WRONG_EMAIL: {
    field: "Email",
    message: "Wrong email input!",
  },
  WRONG_PASSWORD: {
    field: "Password",
    message: "Wrong password input!",
  },
};

export default ErrorConstants;
