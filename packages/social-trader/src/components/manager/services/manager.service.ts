import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem
} from "gv-api-web";
import followApi from "services/api-client/follow-api";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import socialApi from "services/api-client/social-api";
import authService from "services/auth-service";

export const followUser = (id: string) =>
  socialApi.followUser(id, authService.getAuthArg());

export const unFollowUser = (id: string) =>
  socialApi.unfollowUser(id, authService.getAuthArg());

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
): Promise<ItemsViewModelFollowDetailsListItem> => {
  return followApi.getFollowAssets({
    ...filter,
    authorization: authService.getAuthArg()
  });
};

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
    socialApi.getFeed({ ...options, userId: ownerId }),
    followApi.getFollowAssets(options),
    programsApi.getPrograms(options),
    fundsApi.getFunds(options)
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
