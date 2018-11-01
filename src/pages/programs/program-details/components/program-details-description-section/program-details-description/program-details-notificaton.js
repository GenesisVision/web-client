// import { RingIcon } from "components/icon/ring-icon";

import classNames from "classnames";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

import { ReactComponent as RingIcon } from "./ring-icon.svg";

const ProgramDetailsNotificaton = ({ t, url, hasNotifications }) => {
  return (
    <Link to={url}>
      <div className="program-details-description__control">
        <RingIcon
          className={classNames(
            "icon",
            "program-details-description__control-icon",
            "program-details-description__control-icon-notification",
            {
              "program-details-description__control-icon--active": hasNotifications
            }
          )}
        />
        <div className="program-details-description__control-text">
          {t("program-details-page.description.notifications")}
        </div>
      </div>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(ProgramDetailsNotificaton);
