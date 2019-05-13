import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import filesService from "shared/services/file-service";

const NotificationEntity = props => {
  return (
    <Link
      to={{
        pathname: props.href,
        state: `/ ${props.t("notifications-page.title")}`
      }}
    >
      <div className="notification-entity">
        <GVProgramAvatar
          url={filesService.getFileUrl(props.logo)}
          alt={props.title}
          level={props.level}
          color={props.color}
        />
        <div className="notification-entity__title">{props.title}</div>
        <div className="notification-entity__count">{props.count}</div>
      </div>
    </Link>
  );
};

NotificationEntity.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number,
  count: PropTypes.number,
  href: PropTypes.string.isRequired
};

export default translate()(NotificationEntity);
