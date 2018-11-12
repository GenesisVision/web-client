import { RingIcon } from "components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const FundDetailsNotificaton = ({ t, url, pathname, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <div className="fund-details-description__control">
        <RingIcon className="fund-details-description__control-icon" />
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
