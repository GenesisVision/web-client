import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";

export const getHeader = (token?: Token) =>
  api.profile(token).getProfileHeader();
