import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { Push } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import {
  UserPopupItem,
  UserPopupList,
  UserPopupName
} from "components/manager/components/users-popups/users-popups.styles";
import { UsersListItemType } from "components/manager/components/users-popups/users-popups.types";
import { RowItem } from "components/row-item/row-item";
import { ProfilePublicShort } from "gv-api-web";
import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { managerToPathCreator } from "routes/manager.routes";
import { OptionalClickable } from "utils/types";

interface IUsersListItemProps extends OptionalClickable {
  onChange?: (user: ProfilePublicShort) => void;
  user: UsersListItemType;
}

interface IUsersListProps {
  loadMode: VoidFunction;
  hasMore: boolean;
  data: UsersListItemType[];
}

export const UsersListItem: React.FC<IUsersListItemProps> = React.memo(
  ({ onChange, onClick, user }) => {
    const { logoUrl, username, url, id, personalDetails } = user;
    const { contextTitle } = useToLink();
    const link = managerToPathCreator(url, contextTitle);
    const handleFollow = useCallback(() => {
      onChange &&
        onChange({
          ...user,
          personalDetails: {
            ...user.personalDetails,
            isFollow: !user.personalDetails.isFollow
          }
        });
    }, [user, onChange]);
    const handleClick = useCallback(() => {
      Push(link.pathname, link.as);
      onClick && onClick();
    }, [link]);
    return (
      <UserPopupItem>
        <RowItem wide onClick={handleClick}>
          <Center>
            <RowItem>
              <ProfileAvatar url={logoUrl} />
            </RowItem>
            <UserPopupName>{username}</UserPopupName>
          </Center>
        </RowItem>
        {personalDetails && (
          <RowItem>
            <FollowUserButton
              onChange={handleFollow}
              disabled={!personalDetails.allowFollow}
              size={"small"}
              id={id}
              value={personalDetails.isFollow}
              wide={false}
            />
          </RowItem>
        )}
      </UserPopupItem>
    );
  }
);

const _UsersList: React.FC<IUsersListProps> = ({ loadMode, hasMore, data }) => {
  return (
    <UserPopupList>
      <InfiniteScroll useWindow={false} loadMore={loadMode} hasMore={hasMore}>
        {data.map(user => (
          <UsersListItem user={user} />
        ))}
      </InfiniteScroll>
    </UserPopupList>
  );
};

export const UsersList = React.memo(_UsersList);
