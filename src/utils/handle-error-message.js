const handleErrorMessage = response => {
  if (response !== undefined && response.body !== null) {
    return {
      errorMessage: response.body.errors
        .filter(x => !x.property)
        .map(x => x.message)
        .join(", "),
      code: response.body.code
    };
  } else {
    // if (action.payload.status === 401) {
    //   authService.removeToken();
    // }
    const error = {
      errorMessage: "Server Error. Please contact administrator.",
      code: "InternalServerError"
    };
    const defaultError = error;

    return defaultError;
  }
};

export default handleErrorMessage;
