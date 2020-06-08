import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { getFollowers } from "components/manager/services/manager.service";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./users-popups.module.scss";

export const FollowersDialog: React.FC<IFollowersDialogProps> = ({
  id,
  open,
  onClose
}) => {
  const [t] = useTranslation();
  return (
    <Dialog
      className={styles["users-list__dialog"]}
      open={open}
      onClose={onClose}
    >
      <SimpleUserList
        request={() => getFollowers({ id })}
        onClick={onClose}
        title={t("manager-page.followers")}
      />
    </Dialog>
  );
};

export interface IFollowersDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  id: string;
}
