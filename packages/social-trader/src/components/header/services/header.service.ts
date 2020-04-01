import { api, Token } from "services/api-client/swagger-custom-client";

export const getHeader = (token?: Token) =>
  api.profile(token).getProfileHeader();
