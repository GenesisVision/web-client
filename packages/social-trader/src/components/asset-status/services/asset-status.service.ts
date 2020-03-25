import { api, Token } from "services/api-client/swagger-custom-client";

export const getAssetRequests = (id: string) =>
  api
    .investments(Token.create())
    .getRequestsByProgram(id, 0, 100)
    .then(({ items }) => items);
