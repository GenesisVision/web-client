import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import React from "react";
import styled from "styled-components";

import {
  AddApiKeyContainer,
  IAddApiKeyContainerProps
} from "./add-api-key.container";

export interface IAddApiKeyDialogProps
  extends IDialogOuterProps,
    IAddApiKeyContainerProps {}

const StyledDialog = styled(Dialog)`
  width: 80vh;
  max-width: 500px;
`;

export const AddApiKeyDialog: React.FC<IAddApiKeyDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <AddApiKeyContainer {...rest} />
    </StyledDialog>
  );
};
