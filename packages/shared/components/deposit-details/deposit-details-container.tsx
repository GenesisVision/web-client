import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import DepositDetails from "./deposit-details";

interface IDepositDetailsDispatchProps {
  service?: { fetchProfileHeaderInfo(): void };
}
interface IDepositDetailsStateProps {
  available: number;
}

interface IDepositDetailsContainerProps {
  deposit: number;
  className?: string;
  titleClassName?: string;
}

const DepositDetailsContainer: React.FC<
  IDepositDetailsContainerProps &
    IDepositDetailsDispatchProps &
    IDepositDetailsStateProps
> = props => {
  return <DepositDetails {...props} />;
};

const mapStateToProps = (state: RootState): IDepositDetailsStateProps => {
  const available = state.profileHeader.info.data
    ? state.profileHeader.info.data.available
    : 0;
  return {
    available
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IDepositDetailsDispatchProps => ({
  service: bindActionCreators({ fetchProfileHeaderInfo }, dispatch)
});

/*
DepositDetailsContainer.defaultProps = {
  className: "",
  titleClassName: ""
};
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositDetailsContainer);
