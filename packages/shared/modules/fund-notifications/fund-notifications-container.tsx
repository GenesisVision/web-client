import { FundNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import AssetNotifications from "shared/modules/asset-notifications/asset-notifications";
import {
  NOTIFICATIONS,
  NotificationsList
} from "shared/modules/asset-notifications/asset-notifications.types";
import { AuthRootState } from "shared/utils/types";

import {
  addFundNotification,
  fetchFundNotifications,
  removeFundNotification
} from "./services/fund-notifications.services";

class _FundNotificationsContainer extends React.PureComponent<Props> {
  notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.FundNewsAndUpdates,
        label: this.props.t("notifications-page.fund.general.news-updates")
      },
      {
        name: NOTIFICATIONS.FundRebalancing,
        label: this.props.t("notifications-page.fund.general.fund-rebalancing")
      }
    ],
    custom: false
  };
  componentDidMount() {
    this.props.service.fetchFundNotifications(this.props.id);
  }

  render() {
    return (
      <AssetNotifications
        condition={!!this.props.fund}
        asset={this.props.fund!}
        notifications={this.notifications}
        addNotification={addFundNotification}
        removeNotification={removeFundNotification}
      />
    );
  }
}

const mapStateToProps = (
  state: AuthRootState,
  props: OwnProps
): StateProps => ({
  fund: state.fundNotifications[props.id]
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchFundNotifications },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, StateProps, WithTranslation {}

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

const FundNotificationsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_FundNotificationsContainer);
export default FundNotificationsContainer;
