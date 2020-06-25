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
    includeWithInvestments: !!filter.ownerId
  });
};

export const fetchManagerFunds = (
  filter: FilteringType
): Promise<FundDetailsListItemItemsViewModel> => {
  return api.funds().getFunds({
    ...filter,
    includeWithInvestments: !!filter.ownerId
  });
};

export const UserDataInitialCount: IAssetsCountModel = {
  investingFollowCount: 0,
  investingProgramsCount: 0,
  investingFundsCount: 0,
  postsCount: 0,
  followCount: 0,
  programsCount: 0,
  fundsCount: 0
};

export const fetchManagerAssetsCount = ({
  ownerId
}: {
  ownerId: string;
}): Promise<IAssetsCountModel> => {
  const investOptions = {
    subscriberId: ownerId,
    investorId: ownerId,
    take: 0
  };
  const options = {
    ownerId,
    take: 0,
    includeWithInvestments: true
  };
  return Promise.all([
    api.social().getFeed({ ...options, userId: ownerId }),
    api.follows().getFollowAssets(options),
    api.programs().getPrograms(options),
    api.funds().getFunds(options),
    api.follows().getFollowAssets(investOptions),
    api.programs().getPrograms(investOptions),
    api.funds().getFunds(investOptions)
  ]).then(
    ([
      feedData,
      followData,
      programsData,
      fundsData,
      investingFollowData,
      investingProgramsData,
      investingFundsData
    ]) => ({
      investingFollowCount: investingFollowData.total,
      investingProgramsCount: investingProgramsData.total,
      investingFundsCount: investingFundsData.total,
      postsCount: feedData.total,
      followCount: followData.total,
      programsCount: programsData.total,
      fundsCount: fundsData.total
    })
  );
};

export interface IAssetsCountModel {
  investingFollowCount?: number;
  investingProgramsCount?: number;
  investingFundsCount?: number;
  postsCount?: number;
  followCount?: number;
  programsCount?: number;
  fundsCount?: number;
}
