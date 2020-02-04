import GVButton from "components/gv-button";
import * as React from "react";

interface IDepositButtonStateProps {
  available: number;
}

interface IDepositButtonProps {
  onSubmit?(): void;
  disabled?: boolean;
  deposit: number;
  available: number;
  title: string;
  children: JSX.Element;
}

const DepositButton: React.FC<IDepositButtonProps &
  IDepositButtonStateProps> = ({ onSubmit, children, title, disabled }) => (
  <GVButton
    title={title}
    color="primary"
    type="submit"
    onClick={onSubmit}
    disabled={disabled}
  >
    {children}
  </GVButton>
);

const DepositButtonContainer = React.memo(DepositButton);

export default DepositButtonContainer;
