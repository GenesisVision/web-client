import { DialogTop } from "components/dialog/dialog-top";
import { UsersListItem } from "components/manager/components/users-popups/users-list";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { ProfilePublicShort } from "gv-api-web";
import React from "react";

import styles from "./users-popups.module.scss";

export interface ISimpleUserListProps {
  items: ProfilePublicShort[];
}

interface Props extends ISimpleUserListProps {
  title: string;
}

const _SimpleUserList: React.FC<Props> = ({ items, title }) => {
  return (
    <>
      <DialogTop title={title} />
      <PopoverContentCardBlock size={null} fixed={false}>
        <div className={styles["users-list"]}>
          {items.map(user => (
            <UsersListItem user={user} />
          ))}
        </div>
      </PopoverContentCardBlock>
    </>
  );
};

const SimpleUserList = React.memo(_SimpleUserList);
export default SimpleUserList;
