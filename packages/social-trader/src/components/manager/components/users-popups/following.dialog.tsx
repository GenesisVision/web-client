import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { getFollowing } from "components/manager/services/manager.service";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./users-popups.module.scss";

export const FollowingDialog: React.FC<IFollowingDialogProps> = ({
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
        request={() => getFollowing({ id })}
        onClick={onClose}
        title={t("manager-page.following")}
      />
    </Dialog>
  );
};

export interface IFollowingDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  id: string;
}
