import "./back-button.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

const BackButton = ({ t, service, backPath }) => {
  if (!backPath) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={service.goBack}
        color="secondary"
        className="back-button__container"
      >
        <div className="back-button__back-arrow">&larr;</div>
        <div className="back-button__back">{t("buttons.back")}</div>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  backPath: state.routing.location.state
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BackButton);
