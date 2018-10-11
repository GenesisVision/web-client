import authService from "../services/auth-service";
export const SERVER_CONNECTION_ERROR_CODE = "ServerConnectionError";

const handleErrorResponse = response => {
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
  const error = {
    errorMessage: "Server Error. Please contact administrator.",
    code: SERVER_CONNECTION_ERROR_CODE
  };

  return error;
};

export default handleErrorResponse;
