import "./dashboard-portfolio-chart-section.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import Surface from "shared/components/surface/surface";

import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import { getTopAssets } from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class DashboardPortfolioChartSection extends Component {
  componentWillMount() {
    const { service } = this.props;
    service.getTopAssets();
  }

  render() {
    const { t, isNewUser, topAssets } = this.props;
    if (isNewUser) {
      return (
        <Surface className="dashboard-portfolio-chart-section">
          <DashboardGetStarted />
        </Surface>
      );
    }
    if (!topAssets) return null;
    return (
      <Surface className="dashboard-portfolio-chart-section">
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
        <DashboardPortfolioChartContainer />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { info } = state.profileHeader;
  const { topAssets } = state.dashboard;
  return {
    isNewUser: info.data && info.data.isNewUser,
    topAssets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getTopAssets }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioChartSection);
