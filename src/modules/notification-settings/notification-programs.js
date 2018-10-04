import { GVProgramAvatar } from "gv-react-components";
import { PROGRAM_NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import filesService from "shared/services/file-service";
import replaceParams from "utils/replace-params";

const NotificationProgram = props => {
  const href = replaceParams(PROGRAM_NOTIFICATIONS_ROUTE, {
    ":id": props.programId
  });

  return (
    <Link to={href}>
      <div className="notification__program">
        <GVProgramAvatar
          url={filesService.getFileUrl(props.logo)}
          alt={props.title}
          level={props.level}
        />
        {props.title}
        {props.settingsCustom.length + props.settingsGeneral.length}
      </div>
    </Link>
  );
};

class NotificationPrograms extends Component {
  render() {
    const { t, settings } = this.props;
    const items = settings.map(setting => {
      return <NotificationProgram {...setting} />;
    });
    return (
      <div>
        <h3>{t("notifications.programs")}</h3>
        {items}
      </div>
    );
  }
}

NotificationPrograms.propTypes = {};

export default translate()(NotificationPrograms);
