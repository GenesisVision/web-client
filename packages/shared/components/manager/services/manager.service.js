import authService from "shared/services/auth-service";
import fundsApi from "shared/services/api-client/funds-api";
import programsApi from "shared/services/api-client/programs-api";

export const fetchManagerPrograms = filter => {
  return programsApi
    .v10ProgramsGet({ ...filter, authorization: authService.getAuthArg() })
    .then(data => ({
      items: data.programs,
      total: data.total
    }));
};

export const fetchManagerFunds = filter => {
  return fundsApi
    .v10FundsGet({ ...filter, authorization: authService.getAuthArg() })
    .then(data => ({
      items: data.funds,
      total: data.total
    }));
};

export const fetchManagerAssetsCount = managerId => {
  const authorization = authService.getAuthArg();
  const filtering = { managerId, take: 0 };
  return Promise.all([
    programsApi.v10ProgramsGet(filtering, authorization),
    fundsApi.v10FundsGet(filtering, authorization)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};
