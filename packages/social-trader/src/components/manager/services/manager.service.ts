import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem
} from "gv-api-web";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";

export const fetchManagerPrograms = (
  filter: FilteringType
): Promise<ItemsViewModelProgramDetailsListItem> => {
  return programsApi.getPrograms({
    ...filter,
    authorization: authService.getAuthArg(),
    includeWithInvestments: true
  });
};

export const fetchManagerFunds = (
  filter: FilteringType
): Promise<ItemsViewModelFundDetailsListItem> => {
  return fundsApi.getFunds({
    ...filter,
    authorization: authService.getAuthArg(),
    includeWithInvestments: true
  });
};

export const fetchManagerAssetsCount = (
  ownerId: string
): Promise<IAssetsCountModel> => {
  const options = {
    ownerId,
    take: 0,
    includeWithInvestments: true,
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
