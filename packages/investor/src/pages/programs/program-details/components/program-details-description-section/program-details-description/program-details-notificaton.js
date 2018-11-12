import { RingIcon } from "shared/components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const ProgramDetailsNotificaton = ({ t, url, title }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
    >
      <div className="program-details-description__control">
        <RingIcon className="program-details-description__control-icon" />
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
