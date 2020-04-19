import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { IUsersListContainerOuterProps } from "components/manager/components/users-popups/users-list.container";
import { getFollowing } from "components/manager/services/manager.service";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";

import "./users-popups.scss";

const UsersListContainer = dynamic(() => import("./users-list.container"));

export const FollowingDialog: React.FC<IFollowingDialogProps> = props => {
  const [t] = useTranslation();
  const { open, onClose } = props;
  return (
    <Dialog className="users-list__dialog" open={open} onClose={onClose}>
      <UsersListContainer
        title={t("manager-page.following")}
        request={getFollowing}
        {...props}
      />
    </Dialog>
  );
};

export interface IFollowingDialogProps
  extends IDialogOuterProps,
    IUsersListContainerOuterProps {}
