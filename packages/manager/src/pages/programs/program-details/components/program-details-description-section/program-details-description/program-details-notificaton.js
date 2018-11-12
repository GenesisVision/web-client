import classNames from "classnames";
import { RingIcon } from "shared/components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const ProgramDetailsNotificaton = ({ t, url, hasNotifications, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <div className="program-details-description__control">
        <RingIcon
          className={classNames("program-details-description__control-icon", {
            "program-details-description__control-icon--active": hasNotifications
          })}
        />
        <div className="program-details-description__control-text">
          {t("program-details-page.description.notifications")}
        </div>
      </div>
    </Link>
  );
};

export default compose(translate(), isAuthenticated)(ProgramDetailsNotificaton);
