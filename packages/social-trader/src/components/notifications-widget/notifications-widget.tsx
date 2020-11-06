import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import HeaderIcon from "components/header/header-icon";
import { RingIcon } from "components/icon/ring-icon";
import NotificationsSidebar from "components/notifications/components/notifications-sidebar";
import { withBlurLoader } from "decorators/with-blur-loader";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeCommon } from "utils/style/sizes";

const NotificationsCount = styled.div`
  ${fontSize($fontSizeCommon)}
`;

const IconContainer = styled.div`
  width: 16px;
  height: 16px;
`;

const _NotificationsWidget: React.FC<Props> = ({
  data: notificationsCount = 0
}) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const hasNotifications: boolean = notificationsCount > 0;
  const handleClose = useCallback(() => {
    dispatch(ProfileHeaderInfoAction());
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
            <NotificationsCount>{notificationsCount}</NotificationsCount>
          }
          label={
            <HeaderIcon>
              <IconContainer>
                <RingIcon />
              </IconContainer>
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
