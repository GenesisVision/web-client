import { ManagerProfile } from "gv-api-web";
import { Dispatch } from "redux";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import {
  MANAGER_DETAILS_ROUTE,
  MANAGER_SLUG_URL_PARAM_NAME
} from "shared/routes/manager.routes";
import fundsApi from "shared/services/api-client/funds-api";
import ManagerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { TGetState } from "shared/utils/types";

export const fetchManagerProfile = () => (
  dispatch: Dispatch,
  getState: TGetState
): Promise<ManagerProfile> => {
  const { router } = getState();
  const managerSlugUrl = getParams(
    router.location.pathname,
    MANAGER_DETAILS_ROUTE
  )[MANAGER_SLUG_URL_PARAM_NAME];
  return ManagerApi.getManagerProfile(managerSlugUrl);
};

export const fetchManagerPrograms = (
  filter: FilteringType
): Promise<IDataModel> => {
  return programsApi
    .getPrograms({
      ...filter,
      authorization: authService.getAuthArg(),
      hasInvestorsForClosed: true
    })
    .then(data => ({
      items: data.programs,
      total: data.total
    }));
};

export const fetchManagerFunds = (
  filter: FilteringType
): Promise<IDataModel> => {
  return fundsApi
    .getFunds({
      ...filter,
      authorization: authService.getAuthArg(),
      hasInvestorsForClosed: true
    })
    .then(data => ({
      items: data.funds,
      total: data.total
    }));
};

export const fetchManagerAssetsCount = (
  managerId: string
): Promise<IAssetsCountModel> => {
  const options = {
    managerId,
    take: 0,
    hasInvestorsForClosed: true,
    authorization: authService.getAuthArg()
  };
  return Promise.all([
    programsApi.getPrograms(options),
    fundsApi.getFunds(options)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export interface IAssetsCountModel {
  programsCount: number;
  fundsCount: number;
}
