import "./notifications-widget.scss";

import classNames from "classnames";
import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { RingIcon } from "shared/components/icon/ring-icon";
import { withBlurLoader_ } from "shared/decorators/with-blur-loader";

const _NotificationsWidget: React.FC<Props> = ({
  openNotifications,
  data: notificationsCount = 0
}) => {
  const hasNotifications: boolean = notificationsCount > 0;
  return (
    <div
      className={classNames("notifications-widget", {
        "notifications-widget--has": hasNotifications
      })}
      onClick={() => openNotifications()}
    >
      <RingIcon className="notifications-widget__ring" />
      <Chip
        className="notifications-widget__count"
        type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}
      >
        {notificationsCount}
      </Chip>
    </div>
  );
};

interface Props {
  data?: number;
  openNotifications: () => void;
}

const NotificationsWidget = React.memo(withBlurLoader_(_NotificationsWidget));
export default NotificationsWidget;
