import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import React from "react";
import styled from "styled-components";

import {
  EditApiKeyContainer,
  IEditApiKeyContainerProps
} from "./edit-api-key.container";

export interface IEditApiKeyDialogProps
  extends IDialogOuterProps,
    IEditApiKeyContainerProps {}

const StyledDialog = styled(Dialog)`
  width: 80vh;
  max-width: 500px;
`;

export const EditApiKeyDialog: React.FC<IEditApiKeyDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <EditApiKeyContainer {...rest} />
    </StyledDialog>
  );
};
