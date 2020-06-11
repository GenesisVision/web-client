import { getConversationUserLoaderData } from "components/conversation/conversation.loader";
import {
  UsersListDataType,
  UsersListItemType
} from "components/manager/components/users-popups/users-popups.types";
import { FilteringType } from "components/table/components/filtering/filter.type";
import {
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItemItemsViewModel,
  ProgramDetailsListItemItemsViewModel
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { tableLoaderCreator } from "utils/helpers";

export const getUserProfile = (id: string, token?: Token) =>
  api.users(token).getUserProfile(id as string);

export const getMockUsers = (): UsersListItemType[] =>
  tableLoaderCreator(getConversationUserLoaderData);

const getMockUsersPromise = (): Promise<UsersListDataType> =>
  Promise.resolve({
    items: getMockUsers(),
    total: 100
  });

export const getFollowers = ({
  id
}: {
  id: string;
  take?: number;
  count?: number;
}): Promise<UsersListItemType[]> => {
  return api
    .users()
    .getUserProfileFollowDetails(id)
    .then(({ followers }) => followers);
};

export const getFollowing = ({
  id
}: {
  id: string;
  take?: number;
  count?: number;
}): Promise<UsersListItemType[]> => {
  return api
    .users()
    .getUserProfileFollowDetails(id)
    .then(({ following }) => following);
};

export const followUser = (id: string) => api.social().followUser(id);

export const unFollowUser = (id: string) => api.social().unfollowUser(id);

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

export const fetchManagerAssetsCount = ({
  ownerId,
  isBetaTester
}: {
  ownerId: string;
  isBetaTester: boolean;
}): Promise<IAssetsCountModel> => {
  const options = {
    ownerId,
    take: 0,
    includeWithInvestments: true
  };
  return Promise.all([
    isBetaTester
      ? api.social().getFeed({ ...options, userId: ownerId })
      : Promise.resolve({ items: [], total: 0 }),
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
