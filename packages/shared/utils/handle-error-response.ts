import { ErrorViewModel } from "gv-api-web";
import authService from "shared/services/auth-service";

import { ResponseError } from "./types";
export const SERVER_CONNECTION_ERROR_CODE = "ServerConnectionError";

interface IResponse {
  statusCode: number;
  body: ErrorViewModel | null;
}

interface IHandleErrorResponseFunc {
  (response: IResponse): ResponseError;
}
const handleErrorResponse: IHandleErrorResponseFunc = response => {
  if (response) {
    if (response.body !== null) {
      return {
        errorMessage: response.body.errors
          .filter(x => !x.property)
          .map(x => x.message)
          .join(", "),
        code: response.body.code
      };
    }
    if (response.statusCode === 401) {
      authService.removeToken();
      window.location.reload();
    }
  }
  const error = {
    errorMessage:
      "Server error occurred. Please try again later or contact the support department.",
    code: SERVER_CONNECTION_ERROR_CODE
  };

  return error;
};

export default handleErrorResponse;
