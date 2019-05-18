import { FundNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import AssetNotificationsGeneral from "shared/modules/asset-notifications/asset-notifications-general";

import {
  addFundNotification,
  removeFundNotification
} from "./services/fund-notifications.services";

class _FundNotifications extends React.PureComponent<Props> {
  notifications = [
    {
      name: NOTIFICATIONS.FundNewsAndUpdates,
      label: this.props.t("notifications-page.fund.general.news-updates")
    },
    {
      name: NOTIFICATIONS.FundRebalancing,
      label: this.props.t("notifications-page.fund.general.fund-rebalancing")
    }
  ];

  render() {
    const { fund } = this.props;
    return (
      <div>
        <h3 className="notification-settings__title">{fund.title}</h3>
        <AssetNotificationsGeneral
          notifications={this.notifications}
          settings={fund.settingsGeneral}
          assetId={fund.assetId}
          addNotification={addFundNotification}
          removeNotification={removeFundNotification}
        />
      </div>
    );
  }
}

interface Props extends InjectedTranslateProps {
  fund: FundNotificationSettingList;
}

enum NOTIFICATIONS {
  FundNewsAndUpdates = "FundNewsAndUpdates",
  FundRebalancing = "FundRebalancing"
}

const FundNotifications = withLoader(translate()(_FundNotifications));
export default FundNotifications;
