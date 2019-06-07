import * as React from "react";
import { connect } from "react-redux";
import GVButton from "shared/components/gv-button";
import RootState from "shared/reducers/root-reducer";

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

const DepositButton: React.FC<
  IDepositButtonProps & IDepositButtonStateProps
> = ({ onSubmit, children, title, disabled }) => {
  return (
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
};

const mapStateToProps = (state: RootState): IDepositButtonStateProps => {
  const available = state.profileHeader.data
    ? state.profileHeader.data.available
    : 0;
  return {
    available
  };
};

const DepositButtonContainer = connect(mapStateToProps)(
  React.memo(DepositButton)
);

export default DepositButtonContainer;
