import "./notifications-widget.scss";

import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import HeaderIcon from "components/header/header-icon";
import { RingIcon } from "components/icon/ring-icon";
import NotificationsContainer from "components/notifications/components/notifications-container";
import { withBlurLoader } from "decorators/with-blur-loader";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";

const _NotificationsWidget: React.FC<Props> = ({
  data: notificationsCount = 0
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  const hasNotifications: boolean = notificationsCount > 0;
  return (
    <>
      <HeaderIcon>
        <ChipButton
          stretch
          reverseOrder
          onClick={setOpen}
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
      <NotificationsContainer isOpen={isOpen} setClose={setClose} />
    </>
  );
};

interface Props {
  data?: number;
  loaderData?: number;
}

const NotificationsWidget = React.memo(withBlurLoader(_NotificationsWidget));
export default NotificationsWidget;
