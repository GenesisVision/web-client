import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import replaceParams from "shared/utils/replace-params";

import NotificationEntity from "./notification-entity";

class NotificationManagers extends Component {
  render() {
    const { t, settings } = this.props;
    if (settings.length === 0) return null;
    const items = settings.map(setting => {
      const href = replaceParams("/notifications/manager/:id", {
        //TODO: refactor
        ":id": setting.programId
      });
      return (
        <NotificationEntity
          href={href}
          id={setting.managerId}
          title={setting.username}
          logo={setting.avatar}
          count={setting.settingsGeneral.length}
        />
      );
    });
    return (
      <div>
        <h3>{t("notifications-page.managers")}</h3>
        <div className="program-notification__list">{items}</div>
      </div>
    );
  }
}

NotificationManagers.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      managerId: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.string,
      about: PropTypes.string,
      settingsGeneral: PropTypes.array
    })
  )
};

export default withTranslation()(NotificationManagers);
