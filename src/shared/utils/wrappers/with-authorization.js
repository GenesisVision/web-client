import authService from "../../../services/authService";

const withAuthorization = (promise, ...args) => {
  const authorization = `Bearer ${authService.getToken()}`;
  return promise(authorization, ...args);
};

export default withAuthorization;
