import { GVProgramAvatar } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import filesService from "shared/services/file-service";

const NotificationEntity = props => {
  return (
    <Link to={props.href}>
      <div className="notification-entity">
        <GVProgramAvatar
          url={filesService.getFileUrl(props.logo)}
          alt={props.title}
          level={props.level}
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

export default NotificationEntity;
