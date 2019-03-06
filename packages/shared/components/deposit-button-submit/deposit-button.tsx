import { GVButton } from "gv-react-components";
import * as React from "react";
import { connect } from "react-redux";
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
}

const DepositButton: React.FC<
  IDepositButtonProps & IDepositButtonStateProps
> = props => {
  const { onSubmit, children, title, disabled } = props;
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
  const available = state.profileHeader.info.data
    ? state.profileHeader.info.data.available
    : 0;
  return {
    available
  };
};

const DepositButtonContainer = connect(mapStateToProps)(DepositButton);

export default DepositButtonContainer;
