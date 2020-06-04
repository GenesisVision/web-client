import { DialogTop } from "components/dialog/dialog-top";
import { UsersListItem } from "components/manager/components/users-popups/users-list";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { ProfilePublicShort } from "gv-api-web";
import React, { useCallback, useState } from "react";

import styles from "./users-popups.module.scss";

export interface ISimpleUserListProps {
  onChange?: (user: ProfilePublicShort) => void;
  onClick?: VoidFunction;
  items: ProfilePublicShort[];
}

interface Props extends ISimpleUserListProps {
  title: string;
}

export const useUsersList = (items: ProfilePublicShort[]) => {
  const [users, setUsers] = useState(items);
  const handleChange = useCallback(
    (user: ProfilePublicShort) => {
      const updatedUsers = users.filter(({ id }) => user.id !== id);
      setUsers([...updatedUsers, user]);
    },
    [users]
  );
  const usersList = [...users].sort((a, b) => (a.id > b.id ? 1 : -1));
  return { usersList, handleChange };
};

const _SimpleUserList: React.FC<Props> = ({
  onChange,
  onClick,
  items,
  title
}) => {
  return (
    <>
      <DialogTop title={title} />
      <PopoverContentCardBlock size={null} fixed={false}>
        <div className={styles["users-list"]}>
          {items.map(user => (
            <UsersListItem onChange={onChange} onClick={onClick} user={user} />
          ))}
        </div>
      </PopoverContentCardBlock>
    </>
  );
};

const SimpleUserList = React.memo(_SimpleUserList);
export default SimpleUserList;
