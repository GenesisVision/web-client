import { FundNotificationSettingList } from "gv-api-web";
import AssetNotifications from "modules/asset-notifications/asset-notifications";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState } from "utils/types";

import {
  addFundNotification,
  removeFundNotification
} from "./services/fund-notifications.services";

const _FundNotificationsContainer: React.FC<Props> = ({ t, fund }) => {
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.FundNewsAndUpdates,
        label: t("notifications-page.fund.general.news-updates")
      },
      {
        name: NOTIFICATIONS.FundRebalancing,
        label: t("notifications-page.fund.general.fund-rebalancing")
      }
    ],
    custom: false
  };
  return (
    <AssetNotifications
      condition={!!fund}
      asset={fund!}
      notifications={notifications}
      addNotification={addFundNotification}
      removeNotification={removeFundNotification}
    />
  );
};

const mapStateToProps = (
  { fundNotifications }: AuthRootState,
  { id }: OwnProps
): StateProps => ({
  fund: fundNotifications[id]
});

interface Props extends OwnProps, StateProps, WithTranslation {}

interface StateProps {
  fund?: FundNotificationSettingList;
}

interface OwnProps {
  id: string;
}

const FundNotificationsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps),
  React.memo
)(_FundNotificationsContainer);
export default FundNotificationsContainer;
