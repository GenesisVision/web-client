import { GVProgramAvatar } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import filesService from "shared/services/file-service";

const NotificationEntity = props => {
  return (
    <Link to={props.href}>
      <div className="program-notification">
        <GVProgramAvatar
          url={filesService.getFileUrl(props.logo)}
          alt={props.title}
          level={props.level}
        />
        <div className="program-notification__title">{props.title}</div>
        <div className="program-notification__count">{props.count}</div>
      </div>
    </Link>
  );
};

NotificationEntity.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number,
  count: PropTypes.number,
  programId: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default NotificationEntity;
