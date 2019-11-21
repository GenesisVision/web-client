import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  ItemsViewModelFundDetailsList,
  ItemsViewModelProgramDetailsList,
  PublicProfile
} from "gv-api-web";
import { Dispatch } from "redux";
import fundsApi from "shared/services/api-client/funds-api";
import profileApi from "shared/services/api-client/profile-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

export const fetchManagerPrograms = (
  filter: FilteringType
): Promise<ItemsViewModelProgramDetailsList> => {
  return programsApi.getPrograms({
    ...filter,
    authorization: authService.getAuthArg()
    // hasInvestorsForClosed: true
  });
};

export const fetchManagerFunds = (
  filter: FilteringType
): Promise<ItemsViewModelFundDetailsList> => {
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
