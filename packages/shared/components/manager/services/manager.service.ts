import { CancelablePromise, ManagerProfile } from "gv-api-web";
import { Dispatch } from "redux";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import fundsApi from "shared/services/api-client/funds-api";
import ManagerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { TGetState } from "shared/utils/types";

import {
  MANAGER_DETAILS_ROUTE,
  MANAGER_SLUG_URL_PARAM_NAME
} from "../manager.container";

export const fetchManagerProfile = () => (
  dispatch: Dispatch,
  getState: TGetState
): CancelablePromise<ManagerProfile> => {
  const { router } = getState();
  const managerSlugUrl = getParams(
    router.location.pathname,
    MANAGER_DETAILS_ROUTE
  )[MANAGER_SLUG_URL_PARAM_NAME];
  return ManagerApi.v10ManagerByIdGet(managerSlugUrl);
};

export const fetchManagerPrograms = (
  filter: FilteringType
): Promise<IDataModel> => {
  return programsApi
    .v10ProgramsGet({
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
    .v10FundsGet({
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
    programsApi.v10ProgramsGet(options),
    fundsApi.v10FundsGet(options)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export interface IAssetsCountModel {
  programsCount: number;
  fundsCount: number;
}
