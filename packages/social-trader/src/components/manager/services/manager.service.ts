import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import followApi from "services/api-client/follow-api";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import socialApi from "services/api-client/social-api";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const followUser = (id: string) =>
  api.social(Token.create()).followUser(id, authService.getAuthArg());

export const unFollowUser = (id: string) =>
  api.social(Token.create()).unfollowUser(id, authService.getAuthArg());

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
  const token = Token.create();
  return Promise.all([
    api.social(token).getFeed({ ...options, userId: ownerId }),
    api.follows(token).getFollowAssets(options),
    api.programs(token).getPrograms(options),
    api.funds(token).getFunds(options)
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
