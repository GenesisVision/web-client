import {
  LabelAdditionalStyles,
  SuccessMarkAdditionalStyles,
  SuccessMarkStyles
} from "components/button/button.styles";
import {
  IButtonProps,
  ILabelProps,
  ISuccessMarkProps
} from "components/button/button.types";
import { withStyles } from "decorators/withStyles";
import React from "react";

const _Label: React.FC<ILabelProps> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

const Label = withStyles<ILabelProps>({
  additionalStyles: LabelAdditionalStyles
})(_Label);

const _SuccessMark: React.FC<ISuccessMarkProps> = ({ className }) => {
  return <span className={className}>✔</span>;
};
const SuccessMark = withStyles<ISuccessMarkProps>({
  styleTable: SuccessMarkStyles,
  additionalStyles: SuccessMarkAdditionalStyles
})(_SuccessMark);

const _Button: React.FC<IButtonProps> = ({
  successSymbol,
  children,
  testId,
  id,
  disabled,
  className,
  onClick,
  title,
  type,
  name
}) => {
  return (
    <button
      data-test-id={testId}
      id={id}
      disabled={disabled}
      className={className}
      onClick={onClick}
      title={title}
      type={type}
      name={name}
    >
      <Label>{children}</Label>
      {successSymbol && <SuccessMark />}
    </button>
  );
};

export const Button = React.memo(_Button);
