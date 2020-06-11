import Notification from "components/notifications/components/notification/notification";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { NotificationViewModel } from "gv-api-web";
import * as React from "react";

const _NotificationsGroup: React.FC<Props> = ({
  closeNotifications,
  notifications,
  title
}) => (
  <>
    <Row>
      <Text muted size={"small"} weight={"bold"}>
        {title}
      </Text>
    </Row>
    <Row onlyOffset>
      {notifications.map((notification: NotificationViewModel) => (
        <Notification
          {...notification}
          closeNotifications={closeNotifications}
        />
      ))}
    </Row>
  </>
);

interface Props {
  title: string;
  notifications: NotificationViewModel[];
  closeNotifications: VoidFunction;
}

const NotificationsGroup = React.memo(_NotificationsGroup);
export default NotificationsGroup;
