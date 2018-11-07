import "./dashboard-portfolio-chart-section.scss";

import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardInRequestsContainer from "./dashboard-in-requests/dashboard-in-requests-container";

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

  renderSectionBody = () => {
    const { isNewUser } = this.props;
    if (isNewUser === null) return null;
    if (isNewUser) return this.GetStarted();
    return (
      <Fragment>
        <div className="dashboard-portfolio-chart-section__heading">Chart</div>
        <DashboardInRequestsContainer />
        <DashboardPortfolioChartContainer />
      </Fragment>
    );
  };
  render() {
    return (
      <Surface className="dashboard-portfolio-chart-section">
        {this.renderSectionBody()}
      </Surface>
    );
  }
}
const mapStateToProps = state => {
  const { info } = state.profileHeader;
  let isNewUser = null;
  if (info.data) {
    isNewUser = info.data.isNewUser;
  }
  return { isNewUser };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(DashboardPortfolioChartSection);
