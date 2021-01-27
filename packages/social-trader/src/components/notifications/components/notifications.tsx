import Chip, { CHIP_TYPE } from "components/chip/chip";
import { RingIcon } from "components/icon/ring-icon";
import InfinityScroll from "components/infinity-scroll/inifinity-scroll";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import ClearButton from "components/notifications/components/ClearButton";
import NotificationsGroup from "components/notifications/components/notification-group/notification-group";
import {
  getGroups,
  NotificationGroups,
  parseDate,
  sortGroups
} from "components/notifications/components/notifications.helpers";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import Spinner from "components/spiner/spiner";
import { NotificationViewModel } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { adaptiveFullPadding, horizontalPaddings } from "utils/style/mixins";
import { $paddingXsmall } from "utils/style/sizes";

import { NOTIFICATIONS_ROUTE } from "../notifications.routes";
import { SettingsIcon } from "./settings-icon/settings-icon";

interface Props {
  isPending: boolean;
  getNotifications: VoidFunction;
  closeNotifications: VoidFunction;
  count: number;
  total: number;
  notifications?: NotificationViewModel[];
}

const initNotifications: NotificationViewModel[] = [];

const Header = styled(Row)`
  justify-content: space-between;
  ${adaptiveFullPadding($paddingXsmall)};
`;

const Content = styled.div`
  ${horizontalPaddings($paddingXsmall)};
`;

const IconContainer = styled.div`
  width: 16px;
  height: 16px;
`;

const _Notifications: React.FC<Props> = ({
  isPending,
  notifications = initNotifications,
  total = 0,
  count,
  getNotifications,
  closeNotifications
}) => {
  const [mergedNotifications, setMergedNotifications] = useState<
    NotificationViewModel[]
  >([]);

  useEffect(() => {
    setMergedNotifications([...mergedNotifications, ...notifications]);
  }, [notifications]);

  const { linkCreator } = useToLink();
  const [t] = useTranslation();

  const fetchNotification = useCallback(
    () => !isPending && getNotifications(),
    [isPending]
  );
  const renderGroups = (groups: NotificationGroups) => (
    group: string
  ): React.ReactNode => (
    <Row onlyOffset key={group}>
      <NotificationsGroup
        title={parseDate(
          parseInt(group),
          t("notifications-aside.today"),
          t("notifications-aside.yesterday")
        )}
        notifications={groups[parseInt(group)]}
        closeNotifications={closeNotifications}
      />
    </Row>
  );
  const groups = getGroups(mergedNotifications);
  const hasMore = total > mergedNotifications.length;
  const hasNotifications = count > 0;
  return (
    <InfinityScroll loadMore={fetchNotification} hasMore={hasMore}>
      <Header>
        <RowItem>
          <IconContainer>
            <RingIcon />
          </IconContainer>
        </RowItem>
        <RowItem>
          <h4>{t("notifications-aside.header")}</h4>
        </RowItem>
        <RowItem>
          <Chip type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}>
            {count}
          </Chip>
        </RowItem>
        <RowItem>
          {count !== 0 && <ClearButton onApply={getNotifications} />}
        </RowItem>
        <Link
          to={linkCreator(NOTIFICATIONS_ROUTE)}
          onClick={closeNotifications}
        >
          <SettingsIcon />
        </Link>
      </Header>
      <Content>
        {Object.keys(groups)
          .sort(sortGroups)
          .map<React.ReactNode>(renderGroups(groups))}
        <Spinner isShown={isPending} />
      </Content>
    </InfinityScroll>
  );
};

const Notifications = React.memo(_Notifications);
export default Notifications;
