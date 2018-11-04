import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import GlobalSearchResultConatiner from "./components/global-search-result/global-search-result-conatiner";
import BackButton from "components/back-button/back-button";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import connect from "react-redux/es/connect/connect";

const GlobalSearchPage = ({ t, backPath, service }) => (
  <Page title={t("global-search-page.title")}>
    {backPath && <BackButton backPath={backPath} goBack={service.goBack} />}
    <GlobalSearchResultConatiner />
  </Page>
);

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
)(GlobalSearchPage);
