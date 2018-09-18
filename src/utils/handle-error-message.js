const handleErrorMessage = response => {
  if (response !== undefined && response.body !== null) {
    return response.body.errors
      .filter(x => !x.property)
      .map(x => x.message)
      .join(", ");
  } else {
    // if (action.payload.status === 401) {
    //   authService.removeToken();
    // }
    const error = "Server Error. Please contact administrator.";
    const defaultError = error;

    return defaultError;
  }
};

export default handleErrorMessage;
