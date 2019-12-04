import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  CancelablePromise,
  ItemsViewModelFundDetailsList,
  ItemsViewModelProgramDetailsList
} from "gv-api-web";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";

export const fetchManagerPrograms = (
  filter: FilteringType
): CancelablePromise<ItemsViewModelProgramDetailsList> => {
  return programsApi.getPrograms({
    ...filter,
    authorization: authService.getAuthArg()
    // hasInvestorsForClosed: true
  });
};

export const fetchManagerFunds = (
  filter: FilteringType
): CancelablePromise<ItemsViewModelFundDetailsList> => {
  return fundsApi.getFunds({
    ...filter,
    authorization: authService.getAuthArg()
    // hasInvestorsForClosed: true
  });
};

export const fetchManagerAssetsCount = (
  ownerId: string
): Promise<IAssetsCountModel> => {
  const options = {
    ownerId,
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
