import "./notifications-widget.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Chip from "shared/components/chip/chip";
import { RingIcon } from "shared/components/icon/ring-icon";

const NorificationsWidget = ({ openNotifications, notificationsCount }) => {
  const hasNotifications = notificationsCount > 0;
  return (
    <div
      className={classnames("notifications-widget", {
        "notifications-widget--has": hasNotifications
      })}
      onClick={openNotifications}
    >
      <RingIcon className="notifications-widget__ring" />
      <Chip
        className="notifications-widget__count"
        type={hasNotifications ? "negative" : null}
      >
        {notificationsCount}
      </Chip>
    </div>
  );
};

NorificationsWidget.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
  openNotifications: PropTypes.func.isRequired
};

NorificationsWidget.defaultProps = {
  notificationsCount: 0
};

export default NorificationsWidget;
