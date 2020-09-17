import { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { UserPopupDialog } from "components/manager/components/users-popups/users-popups.styles";
import { getFollowing } from "components/manager/services/manager.service";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

export interface IFollowingDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  id: string;
}

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
    <UserPopupDialog open={open} onClose={handleClose}>
      <SimpleUserList
        onChange={setIsChanged}
        request={() => getFollowing({ id })}
        onClick={onClose}
        title={t("manager-page:following")}
      />
    </UserPopupDialog>
  );
};
