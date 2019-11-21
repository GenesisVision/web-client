import "./notifications-widget.scss";

import Chip from "components/chip/chip";
import { RingIcon } from "components/icon/ring-icon";
import * as React from "react";

export const NotificationsWidgetLoader: React.FC = React.memo(() => (
  <div className="notifications-widget">
    <RingIcon className="notifications-widget__ring" />
    <Chip className="notifications-widget__count">...</Chip>
  </div>
));
