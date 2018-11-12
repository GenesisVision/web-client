import "./details-description-controls.scss";

import { RingIcon } from "shared/components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import classNames from "classnames";

const DetailsNotificaton = ({ t, url, hasNotifications, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <div className="details-description__control">
        <RingIcon
          className={classNames("details-description__control-icon", {
            "details-description__control-icon--active": hasNotifications
          })}
        />
        <div className="details-description__control-text">
          {t("program-details-page.description.notifications")}
        </div>
      </div>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(DetailsNotificaton);
