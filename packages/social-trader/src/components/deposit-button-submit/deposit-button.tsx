import { Button } from "components/button/button";
import * as React from "react";

interface IDepositButtonStateProps {
  available: number;
}

interface IDepositButtonProps {
  onSubmit?: VoidFunction;
  disabled?: boolean;
  deposit: number;
  available: number;
  title: string;
  children: JSX.Element;
}

const DepositButton: React.FC<IDepositButtonProps &
  IDepositButtonStateProps> = ({ onSubmit, children, title, disabled }) => (
  <Button title={title} onClick={onSubmit} disabled={disabled}>
    {children}
  </Button>
);

const DepositButtonContainer = React.memo(DepositButton);
export default DepositButtonContainer;
