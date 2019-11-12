import "./notifications-widget.scss";

import classNames from "classnames";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { notificationsToggle } from "shared/components/header/header.service";
import { RingIcon } from "shared/components/icon/ring-icon";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

const _NotificationsWidget: React.FC<Props> = ({
  data: notificationsCount = 0
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.notifications.isOpen);
  const handlerOpenNotifications = useCallback(
    () => dispatch(notificationsToggle(isOpen)),
    []
  );
  const hasNotifications: boolean = notificationsCount > 0;
  return (
    <div
      className={classNames("notifications-widget", {
        "notifications-widget--has": hasNotifications
      })}
      onClick={handlerOpenNotifications}
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
  loaderData?: number;
}

const NotificationsWidget = React.memo(withBlurLoader(_NotificationsWidget));
export default NotificationsWidget;
