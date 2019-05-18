import { FundNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";

import FundNotificationsGeneral from "./fund-notificatations-general";

const _FundNotifications: React.FC<{ fund: FundNotificationSettingList }> = ({
  fund
}) => (
  <div>
    <h3 className="notification-settings__title">{fund.title}</h3>
    <FundNotificationsGeneral
      settings={fund.settingsGeneral}
      assetId={fund.assetId}
    />
  </div>
);

const FundNotifications = React.memo(
  withLoader(translate()(_FundNotifications))
);
export default FundNotifications;
