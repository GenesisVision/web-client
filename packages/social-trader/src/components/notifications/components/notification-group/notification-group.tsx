import { MutedText } from "components/muted-text/muted-text";
import Notification from "components/notifications/components/notification/notification";
import { Row } from "components/row/row";
import { NotificationViewModel } from "gv-api-web";
import * as React from "react";

const _NotificationsGroup: React.FC<Props> = ({
  closeNotifications,
  notifications,
  title
}) => (
  <>
    <Row>
      <MutedText small bold>
        {title}
      </MutedText>
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
