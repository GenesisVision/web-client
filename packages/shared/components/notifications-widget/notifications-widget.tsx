import "./notifications-widget.scss";

import classNames from "classnames";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { RingIcon } from "shared/components/icon/ring-icon";
import withLoader from "shared/decorators/with-loader";

const _NotificationsWidget: React.FC<Props> = ({
  openNotifications,
  profileHeader
}) => {
  const hasNotifications: boolean = profileHeader.notificationsCount > 0;
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
        {profileHeader.notificationsCount}
      </Chip>
    </div>
  );
};

interface Props {
  profileHeader: ProfileHeaderViewModel;
  openNotifications: () => void;
}

const NotificationsWidget = React.memo(withLoader(_NotificationsWidget));
export default NotificationsWidget;
