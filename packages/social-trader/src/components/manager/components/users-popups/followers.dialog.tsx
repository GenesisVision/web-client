import { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { UserPopupDialog } from "components/manager/components/users-popups/users-popups.styles";
import { getFollowers } from "components/manager/services/manager.service";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface IFollowersDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  id: string;
}

export const FollowersDialog: React.FC<IFollowersDialogProps> = ({
  onChange,
  id,
  open,
  onClose
}) => {
  const [t] = useTranslation();
  const [isChanged, setIsChanged, setIsNotChanged] = useIsOpen();

  useEffect(() => {
    if (open) setIsNotChanged();
  }, [open]);

  const handleClose = useCallback(() => {
    if (isChanged && onChange) onChange();
    onClose();
  }, [isChanged, onChange, onClose]);
  return (
    <UserPopupDialog open={open} onClose={handleClose}>
      <SimpleUserList
        onChange={setIsChanged}
        request={() => getFollowers({ id })}
        onClick={onClose}
        title={t("manager-page:followers")}
      />
    </UserPopupDialog>
  );
};
