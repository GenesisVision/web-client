import { bindActionCreators } from "redux";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import React, { Component } from "react";

import "./dashboard-portfolio-chart-section.scss";

import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import { getAssets } from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class DashboardPortfolioChartSection extends Component {
  componentWillMount() {
    const { service } = this.props;
    service.getAssets();
  }

  render() {
    const { t, isNewUser, assets } = this.props;
    if (isNewUser) return <DashboardGetStarted />;

    return (
      <React.Fragment>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {t("manager.dashboard-page.chart-section.header")}
        </h3>
        <div className="dashboard-portfolio-chart-section__actions">
          <DashboardChartAssetsContainer />
          <DashboardInRequestsContainer
            cancelRequest={cancelRequest}
            getInRequests={getInRequests}
          />
        </div>
        <DashboardPortfolioChartContainer assets={assets} key={!assets} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { info } = state.profileHeader;
  const { assets } = state.dashboard;
  return {
    isNewUser: info.data && info.data.isNewUser,
    assets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getAssets }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioChartSection);
