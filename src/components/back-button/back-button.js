import "./back-button.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { bindActionCreators, compose } from "redux";
import { goBack } from "react-router-redux";
import connect from "react-redux/es/connect/connect";

const BackButton = ({ t, service, backPath }) => {
  return backPath ? (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={service.goBack}
        color="secondary"
        className="back-button__container"
      >
        <span className="back-button__back-arrow">&larr;</span>
        <span className="back-button__back">{t("buttons.back")}</span>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  ) : null;
};

const mapStateToProps = state => ({
  backPath: state.routing.location.state
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(translate()(BackButton));
