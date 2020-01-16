import "./notifications-widget.scss";

import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import HeaderIcon from "components/header/header-icon";
import { notificationsToggle } from "components/header/header.service";
import { RingIcon } from "components/icon/ring-icon";
import { withBlurLoader } from "decorators/with-blur-loader";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";

const _NotificationsWidget: React.FC<Props> = ({
  data: notificationsCount = 0
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.notifications.isOpen);
  const handlerOpenNotifications = useCallback(() => {
    dispatch(notificationsToggle(isOpen));
  }, []);
  const hasNotifications: boolean = notificationsCount > 0;
  return (
    <HeaderIcon>
      <ChipButton
        stretch
        reverseOrder
        onClick={handlerOpenNotifications}
        type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}
        chipLabel={
          <div className="notifications-count">{notificationsCount}</div>
        }
        label={
          <HeaderIcon>
            <RingIcon />
          </HeaderIcon>
        }
      />
    </HeaderIcon>
  );
};

interface Props {
  data?: number;
  loaderData?: number;
}

const NotificationsWidget = React.memo(withBlurLoader(_NotificationsWidget));
export default NotificationsWidget;
