import fundsApi from "shared/services/api-client/funds-api";
import programsApi from "shared/services/api-client/programs-api";

import authService from "../../../services/auth-service";

export const fetchManagerPrograms = filter => {
  return programsApi
    .v10ProgramsGet({ ...filter, authorization: authService.getAuthArg() })
    .then(data => {
      return Promise.resolve({
        items: data.programs,
        total: data.total
      });
    });
};

export const fetchManagerFunds = filter => {
  return fundsApi
    .v10FundsGet({ ...filter, authorization: authService.getAuthArg() })
    .then(data => {
      return Promise.resolve({
        items: data.funds,
        total: data.total
      });
    });
};
