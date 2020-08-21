import {
  ButtonDynamicStyles,
  ButtonStyles,
  LabelDynamicStyles,
  SuccessMarkDynamicStyles
} from "components/button/button.styles";
import { IButtonProps, ILabelProps } from "components/button/button.types";
import React from "react";
import styled from "styled-components";
import { parseStyles } from "utils/style/style-generators";
import { transition } from "utils/style/style-mixins";

const Label = styled.span<ILabelProps>`
  ${transition("opacity")}
  ${LabelDynamicStyles}
`;

const SuccessMark = styled.span<ILabelProps>`
  position: absolute;
  ${transition("opacity")}
  ${SuccessMarkDynamicStyles}
`;

const StyledButton = styled.button<IButtonProps>`
  ${parseStyles({ styleTable: ButtonStyles })}
  ${ButtonDynamicStyles}
`;

const _Button: React.FC<IButtonProps> = props => {
  const { isSuccessful, successSymbol = true, children, testId } = props;
  return (
    <StyledButton data-test-id={testId} {...props}>
      <Label isSuccessful={isSuccessful}>{children}</Label>
      {successSymbol && (
        <SuccessMark isSuccessful={isSuccessful}>✔</SuccessMark>
      )}
    </StyledButton>
  );
};

export const Button = React.memo<IButtonProps>(_Button);
