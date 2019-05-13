import "./navigation-back-button.scss";

import { goBack } from "connected-react-router";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import GVButton from "shared/components/gv-button";

const BackButton = ({ t, service }) => {
  return (
    <div className="navigation-back">
      <GVButton variant="text" onClick={service.goBack} color="secondary">
        <span className="navigation-back__arrow">&larr;</span>
        {t("buttons.back")}
      </GVButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

const NavigationBackButton = compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
    null,
    { pure: false }
  )
)(BackButton);

export default NavigationBackButton;
