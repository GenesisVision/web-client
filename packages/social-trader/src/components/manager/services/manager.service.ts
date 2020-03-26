import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const followUser = (id: string) =>
  api.social().followUser(id, authService.getAuthArg());

export const unFollowUser = (id: string) =>
  api.social().unfollowUser(id, authService.getAuthArg());

export const toggleFollowUser = ({
  id,
  value
}: {
  id: string;
  value: boolean;
}) => {
  const method = value ? unFollowUser : followUser;
  return method(id);
};

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
  return Promise.all([
    api.social().getFeed({ ...options, userId: ownerId }),
    api.follows().getFollowAssets(options),
    api.programs().getPrograms(options),
    api.funds().getFunds(options)
  ]).then(([feedData, followData, programsData, fundsData]) => ({
    postsCount: feedData.total,
    followCount: followData.total,
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export interface IAssetsCountModel {
  postsCount?: number;
  followCount?: number;
  programsCount?: number;
  fundsCount?: number;
}
