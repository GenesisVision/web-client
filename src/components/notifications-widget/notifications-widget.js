import "./notifications-widget.scss";

import classnames from "classnames";
import Chip from "components/chip/chip";
import { RingIcon } from "components/icon/ring-icon";
import PropTypes from "prop-types";
import React from "react";

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
