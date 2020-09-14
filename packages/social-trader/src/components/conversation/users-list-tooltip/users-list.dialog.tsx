import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import SimpleUserList, {
  ISimpleUserListProps
} from "components/manager/components/users-popups/simple-users-list";
import { UsersListItemType } from "components/manager/components/users-popups/users-popups.types";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

export interface IUsersDialogProps
  extends IDialogOuterProps,
    ISimpleUserListProps {
  request: () => Promise<UsersListItemType[]>;
  dialogTitle: string;
}

const StyledDialog = styled(Dialog)`
  width: 80vh;
  max-width: 500px;
`;

export const UsersDialog: React.FC<IUsersDialogProps> = ({
  request,
  dialogTitle,
  onChange,
  open,
  onClose
}) => {
  const [isChanged, setIsChanged, setIsNotChanged] = useIsOpen();

  useEffect(() => {
    if (open) setIsNotChanged();
  }, [open]);

  const handleClose = useCallback(() => {
    if (isChanged && onChange) onChange();
    onClose();
  }, [isChanged, onChange, onClose]);
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <SimpleUserList
        onChange={setIsChanged}
        request={request}
        onClick={onClose}
        title={dialogTitle}
      />
    </StyledDialog>
  );
};
