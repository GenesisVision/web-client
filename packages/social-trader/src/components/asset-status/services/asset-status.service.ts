import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";

export const getAssetRequests = (id: string) =>
  investmentsApi
    .getRequestsByProgram(id, 0, 100, authService.getAuthArg())
    .then(({ items }) => items);
