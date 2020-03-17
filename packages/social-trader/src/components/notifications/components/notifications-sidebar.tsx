import Sidebar, { SIDEBAR_POSITION } from "components/sidebar/sidebar";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";

const NotificationsContainer = dynamic(() =>
  import("components/notifications/components/notifications-container")
);

const _NotificationsSidebar: React.FC<Props> = ({ isOpen, setClose }) => {
  return (
    <Sidebar open={isOpen} position={SIDEBAR_POSITION.RIGHT} onClose={setClose}>
      <NotificationsContainer setClose={setClose} />
    </Sidebar>
  );
};

interface Props {
  isOpen: boolean;
  setClose: VoidFunction;
}

const NotificationsSidebar = React.memo(_NotificationsSidebar);
export default NotificationsSidebar;
