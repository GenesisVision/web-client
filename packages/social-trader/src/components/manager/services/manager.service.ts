import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const fetchManagerFollow = (
  filter: FilteringType
): Promise<FollowDetailsListItemItemsViewModel> => {
  return api.follows().getFollowAssets(filter);
};

export const fetchManagerPrograms = (
  filter: FilteringType
): Promise<ProgramDetailsListItemItemsViewModel> => {
  return api.programs().getPrograms({
    ...filter,
    includeWithInvestments: true
  });
};

export const fetchManagerFunds = (
  filter: FilteringType
): Promise<FundDetailsListItemItemsViewModel> => {
  return api.funds().getFunds({
    ...filter,
    includeWithInvestments: true
  });
};

export const fetchManagerAssetsCount = (
  ownerId: string
): Promise<IAssetsCountModel> => {
  const options = {
    ownerId,
    take: 0,
    includeWithInvestments: true
  };
  const token = Token.create();
  return Promise.all([
    api.follows(token).getFollowAssets(options),
    api.programs(token).getPrograms(options),
    api.funds(token).getFunds(options)
  ]).then(([followData, programsData, fundsData]) => ({
    followCount: followData.total,
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export interface IAssetsCountModel {
  followCount: number;
  programsCount: number;
  fundsCount: number;
}
