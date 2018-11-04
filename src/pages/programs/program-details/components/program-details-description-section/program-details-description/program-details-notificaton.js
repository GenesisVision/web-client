import { RingIcon } from "components/icon/ring-icon";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import connect from "react-redux/es/connect/connect";

const ProgramDetailsNotificaton = ({ t, url, pathname }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: pathname
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

const mapStateToProps = state => {
  const { pathname } = state.routing.location;
  return { pathname };
};

export default compose(
  translate(),
  isAuthenticated,
  connect(mapStateToProps)
)(ProgramDetailsNotificaton);
