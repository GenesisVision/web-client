import { ManagerPortfolioEvent } from "gv-api-web";
import { mapToTableItems } from "shared/components/table/helpers/mapper";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const fetchPortfolioEvents = (filters: any) => {
  const authorization = authService.getAuthArg();

  return managerApi
    .v10ManagerEventsGet(authorization, filters)
    .then(mapToTableItems<ManagerPortfolioEvent>("events"));
};
