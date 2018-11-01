import classNames from "classnames";
import { RingIcon } from "components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const FundDetailsNotificaton = ({ t, url, hasNotifications }) => {
  return (
    <Link to={url}>
      <div className="fund-details-description__control">
        <RingIcon
          className={classNames("fund-details-description__control-icon", {
            "fund-details-description__control-icon--active": hasNotifications
          })}
        />
        <div className="fund-details-description__control-text">
          {t("fund-details-page.description.notifications")}
        </div>
      </div>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(FundDetailsNotificaton);
