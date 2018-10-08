import "./dashboard-portfolio-events-all.scss";

import React from "react";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { translate } from "react-i18next";
import Page from "components/page/page";
import PortfolioEventsTableComponent from "./dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import PortfolioEventsAllNavigation from "./dashboard-portfolio-events-all-navigation";

export const PORTFOLIO_EVENTS_ALL_PAGE_ROUTE = "portfolio-events";
const PortfolioEventsAllComponent = ({ service, t }) => {
  return (
    <Page title={t("dashboard.portfolio-events.title")}>
      <div className="dashboard-portfolio-events-all">
        <PortfolioEventsAllNavigation
          className="dashboard-portfolio-events-all__navigation"
          goBack={service.goBack}
        />
        <h1 className="dashboard-portfolio-events-all__heading">
          {t("dashboard.portfolio-events.title")}
        </h1>
        <PortfolioEventsTableComponent
          title={t("dashboard.portfolio-events.table-title")}
        />
      </div>
    </Page>
  );
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(translate()(PortfolioEventsAllComponent));
