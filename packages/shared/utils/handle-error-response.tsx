import authService from "shared/services/auth-service";
export const SERVER_CONNECTION_ERROR_CODE = "ServerConnectionError";

const handleErrorResponse = (response: any): IError => {
  if (response) {
    if (response.body !== null) {
      return {
        errorMessage: response.body.errors
          .filter((x: any) => !x.property)
          .map((x: any) => x.message)
          .join(", "),
        code: response.body.code
      };
    }
    if (response.statusCode === 401) {
      authService.removeToken();
      window.location.reload();
    }
  }

  return {
    errorMessage:
      "Server error occurred. Please try again later or contact the support department.",
    code: SERVER_CONNECTION_ERROR_CODE
  };
};

export interface IError {
  errorMessage: string;
  code: string;
}

export default handleErrorResponse;
