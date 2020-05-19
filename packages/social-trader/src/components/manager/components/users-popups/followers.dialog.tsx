import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { IUsersListContainerOuterProps } from "components/manager/components/users-popups/users-list.container";
import { getFollowers } from "components/manager/services/manager.service";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./users-popups.module.scss";

const UsersListContainer = dynamic(() => import("./users-list.container"));

export const FollowersDialog: React.FC<IFollowersDialogProps> = props => {
  const [t] = useTranslation();
  const { open, onClose } = props;
  return (
    <Dialog
      className={styles["users-list__dialog"]}
      open={open}
      onClose={onClose}
    >
      <UsersListContainer
        title={t("manager-page.followers")}
        request={getFollowers}
        {...props}
      />
    </Dialog>
  );
};

export interface IFollowersDialogProps
  extends IDialogOuterProps,
    IUsersListContainerOuterProps {}
