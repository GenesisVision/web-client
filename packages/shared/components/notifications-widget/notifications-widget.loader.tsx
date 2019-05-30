import "./notifications-widget.scss";

import * as React from "react";
import Chip from "shared/components/chip/chip";
import { RingIcon } from "shared/components/icon/ring-icon";

export const NotificationsWidgetLoader: React.FC = React.memo(() => (
  <div className="notifications-widget">
    <RingIcon className="notifications-widget__ring" />
    <Chip className="notifications-widget__count">...</Chip>
  </div>
));
