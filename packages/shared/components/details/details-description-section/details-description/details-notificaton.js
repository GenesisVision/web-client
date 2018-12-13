import "./details-description-control.scss";

import { RingIcon } from "shared/components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import classnames from "classnames";
import DetailsDescriptionControl from "./details-description-control";

const DetailsNotificaton = ({ t, url, hasNotifications, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <DetailsDescriptionControl text={t("fund-details-page.description.notifications")}>
        <RingIcon
          className={classnames("details-description-control__icon", {
            "icon--active": hasNotifications
          })}
        />
      </DetailsDescriptionControl>
    </Link>
  );
};

export default compose(
  translate(),
  isAuthenticated
)(DetailsNotificaton);
