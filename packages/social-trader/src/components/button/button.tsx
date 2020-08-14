import {
  ButtonDynamicStyles,
  ButtonStyles,
  LabelDynamicStyles,
  LabelStyles,
  SuccessMarkDynamicStyles,
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
  staticStyles: LabelStyles,
  dynamicStyles: LabelDynamicStyles
})(_Label);

const _SuccessMark: React.FC<ISuccessMarkProps> = ({ className }) => {
  return <span className={className}>✔</span>;
};
const SuccessMark = withStyles<ISuccessMarkProps>({
  staticStyles: SuccessMarkStyles,
  dynamicStyles: SuccessMarkDynamicStyles
})(_SuccessMark);

const _Button: React.FC<IButtonProps> = ({
  isSuccessful,
  successSymbol = true,
  children,
  testId,
  id,
  disabled,
  className,
  onClick,
  title,
  type = "button",
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
      <Label isSuccessful={isSuccessful}>{children}</Label>
      {successSymbol && <SuccessMark isSuccessful={isSuccessful} />}
    </button>
  );
};

export const Button = React.memo<IButtonProps>(
  withStyles<IButtonProps>({
    staticStyles: ButtonStyles,
    dynamicStyles: ButtonDynamicStyles
  })(_Button)
);
