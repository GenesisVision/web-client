import { RingIcon } from "components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const FundDetailsNotificaton = ({ t, url }) => {
  return (
    <Link to={url}>
      <div className="fund-details-description__control">
        <RingIcon className="fund-details-description__control-icon" />
      </div>
      <div className="fund-details-description__control-text">
        {t("fund-details-page.description.notifications")}
      </div>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(FundDetailsNotificaton);
