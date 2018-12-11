import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const fetchPortfolioEvents = filters => {
  const authorization = authService.getAuthArg();

  return managerApi.v10ManagerEventsGet(authorization, filters).then(data => ({
    items: data.events,
    total: data.total
  }));
};
