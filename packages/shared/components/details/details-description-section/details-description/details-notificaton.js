import "./details-description-control.scss";

import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { RingIcon } from "shared/components/icon/ring-icon";
import isAuthenticated from "shared/decorators/is-authenticated";

import DetailsDescriptionControl from "./details-description-control";

const DetailsNotificaton = ({ t, url, hasNotifications, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <DetailsDescriptionControl
        text={t("fund-details-page.description.notifications")}
      >
        <RingIcon
          selected={hasNotifications}
          className="details-description-control__icon"
        />
      </DetailsDescriptionControl>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(DetailsNotificaton);
