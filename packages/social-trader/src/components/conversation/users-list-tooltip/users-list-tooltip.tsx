import {
  IUserAvatarListProps,
  UserAvatarList
} from "components/user-avatar-list/user-avatar-list";
import React from "react";

export interface IUsersListTooltipProps extends IUserAvatarListProps {}

const _UsersListTooltip: React.FC<IUsersListTooltipProps> = ({
  onClickRemainder,
  count,
  list
}) => {
  return (
    <UserAvatarList
      onClickRemainder={onClickRemainder}
      remainderColor={"#273642"}
      count={count}
      list={list}
    />
  );
};

export const UsersListTooltip = React.memo(_UsersListTooltip);
