import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { GV_BTN_SIZE } from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { FollowUserButton } from "components/manager/components/follow-user-buttom";
import { UsersListItemType } from "components/manager/components/users-popups/users-popups.types";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { managerToPathCreator } from "routes/manager.routes";
import { getRandomBoolean } from "utils/helpers";

import "./users-popups.scss";

interface IUsersListItemProps {
  user: UsersListItemType;
}
interface IUsersListProps {
  loadMode: VoidFunction;
  hasMore: boolean;
  data: UsersListItemType[];
}

const UsersListItem: React.FC<IUsersListItemProps> = React.memo(
  ({ user: { logoUrl, username, url, id } }) => {
    const { contextTitle } = useToLink();
    const link = managerToPathCreator(url, contextTitle);
    return (
      <Row wide className="users-list__item">
        <RowItem wide>
          <Link white to={link}>
            <Center>
              <RowItem>
                <ProfileAvatar url={logoUrl} />
              </RowItem>
              <RowItem wide className="users-list__name">
                {username}
              </RowItem>
            </Center>
          </Link>
        </RowItem>
        <RowItem>
          <FollowUserButton
            size={GV_BTN_SIZE.SMALL}
            id={id}
            value={getRandomBoolean()}
          />
        </RowItem>
      </Row>
    );
  }
);

const _UsersList: React.FC<IUsersListProps> = ({ loadMode, hasMore, data }) => {
  return (
    <div className="users-list">
      <InfiniteScroll useWindow={false} loadMore={loadMode} hasMore={hasMore}>
        {data.map(user => (
          <UsersListItem user={user} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export const UsersList = React.memo(_UsersList);