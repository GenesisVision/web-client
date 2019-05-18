import { FundNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { AuthRootState } from "shared/utils/types";

import FundNotifications from "./fund-notifications";
import { fetchFundNotifications } from "./services/fund-notifications.services";

class _FundNotificationsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.service.fetchFundNotifications(this.props.id);
  }

  render() {
    return (
      <FundNotifications
        condition={!!this.props.fund}
        fund={this.props.fund!}
      />
    );
  }
}

const mapStateToProps = (
  state: AuthRootState,
  props: OwnProps
): StateProps => ({
  fund: state.fundNotifications.data[props.id]
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchFundNotifications },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, StateProps {}

interface StateProps {
  fund?: FundNotificationSettingList;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchFundNotifications: typeof fetchFundNotifications;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  id: string;
}

const FundNotificationsContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AuthRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_FundNotificationsContainer);
export default FundNotificationsContainer;
