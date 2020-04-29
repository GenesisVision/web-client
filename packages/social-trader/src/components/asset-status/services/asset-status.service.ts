import { api } from "services/api-client/swagger-custom-client";

export const getAssetRequests = (id: string) =>
  api
    .investments()
    .getRequestsByProgram(id, 0, 100)
    .then(({ items }) => items);
