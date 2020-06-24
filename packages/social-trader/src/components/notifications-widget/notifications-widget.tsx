import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import HeaderIcon from "components/header/header-icon";
import { fetchProfileHeaderInfo } from "components/header/header.service";
import { RingIcon } from "components/icon/ring-icon";
import NotificationsSidebar from "components/notifications/components/notifications-sidebar";
import { withBlurLoader } from "decorators/with-blur-loader";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import styles from "./notifications-widget.module.scss";

const _NotificationsWidget: React.FC<Props> = ({
  data: notificationsCount = 0
}) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const hasNotifications: boolean = notificationsCount > 0;
  const handleClose = useCallback(() => {
    dispatch(fetchProfileHeaderInfo);
    setClose();
  }, []);
  return (
    <>
      <HeaderIcon>
        <ChipButton
          stretch
          reverseOrder
          onClick={setOpen}
          type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}
          chipLabel={
            <div className={styles["notifications-count"]}>
              {notificationsCount}
            </div>
          }
          label={
            <HeaderIcon>
              <RingIcon />
            </HeaderIcon>
          }
        />
      </HeaderIcon>
      <NotificationsSidebar isOpen={isOpen} setClose={handleClose} />
    </>
  );
};

interface Props {
  data?: number;
  loaderData?: number;
}

const NotificationsWidget = React.memo(withBlurLoader(_NotificationsWidget));
export default NotificationsWidget;
