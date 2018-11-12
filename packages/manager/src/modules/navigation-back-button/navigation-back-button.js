import "./navigation-back-button.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

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
  connect(null, mapDispatchToProps, null, { pure: false })
)(BackButton);

export default NavigationBackButton;
