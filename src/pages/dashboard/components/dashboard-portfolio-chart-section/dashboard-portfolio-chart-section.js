import "./dashboard-portfolio-chart-section.scss";

import Surface from "components/surface/surface";
import React, { Component, Fragment } from "react";

import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardInRequestsContainer from "./dashboard-in-requests/dashboard-in-requests-container";
import { translate } from "react-i18next";
import { GVButton } from "gv-react-components";
import { Link } from "react-router-dom";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";

class DashboardPortfolioChartSection extends Component {
  GetStarted = () => {
    const { t } = this.props;
    return (
      <div className="get-started">
        <div className="get-started__title">
          {t("dashboard.get-started.title")}
        </div>
        <div className="get-started__text">
          <div>{t("dashboard.get-started.text-1")}</div>
          <div>{t("dashboard.get-started.text-2")}</div>
        </div>
        <div className="get-started__deposit">
          <Link to={WALLET_PAGE_ROUTE}>
            <GVButton
              id="signUpFormSubmit"
              className="invest-form__submit-button"
            >
              {t("dashboard.get-started.deposit")}
            </GVButton>
          </Link>
        </div>
        <div className="get-started__programs">
          <Link to={PROGRAMS_ROUTE}>
            <GVButton variant="text" color="secondary">
              {t("dashboard.get-started.programs")} &#8250;
            </GVButton>
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { invested } = this.props;
    return (
      <Surface className="dashboard-portfolio-chart-section">
        {(invested && (
          <Fragment>
            <div className="dashboard-portfolio-chart-section__heading">
              Chart
            </div>
            <DashboardInRequestsContainer />
            <DashboardPortfolioChartContainer />
          </Fragment>
        )) ||
          this.GetStarted()}
      </Surface>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.dashboard.portfolioChartData);
  const { portfolioChartData } = state.dashboard;
  if (!portfolioChartData.data) return;
  return { invested: state.dashboard.portfolioChartData.data.isNewUser };
};
export default compose(
  translate(),
  connect(mapStateToProps)
)(DashboardPortfolioChartSection);
