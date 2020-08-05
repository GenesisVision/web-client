import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { getFollowing } from "components/manager/services/manager.service";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import styles from "./users-popups.module.scss";

export const FollowingDialog: React.FC<IFollowingDialogProps> = ({
  onChange,
  id,
  open,
  onClose
}) => {
  const [t] = useTranslation();
  const [isChanged, setIsChanged] = useIsOpen();

  const handleClose = useCallback(() => {
    if (isChanged && onChange) onChange();
    onClose();
  }, [isChanged, onChange, onClose]);
  return (
    <Dialog
      className={styles["users-list__dialog"]}
      open={open}
      onClose={handleClose}
    >
      <SimpleUserList
        onChange={setIsChanged}
        request={() => getFollowing({ id })}
        onClick={onClose}
        title={t("manager-page:following")}
      />
    </Dialog>
  );
};

export interface IFollowingDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  id: string;
}
