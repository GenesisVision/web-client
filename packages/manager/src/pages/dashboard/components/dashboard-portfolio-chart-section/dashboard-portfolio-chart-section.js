import "./dashboard-portfolio-chart-section.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import Surface from "shared/components/surface/surface";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";

import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class DashboardPortfolioChartSection extends Component {
  getAssets = () => {
    const { programsData, fundsData } = this.props;

    if (programsData && fundsData) {
      return { programs: programsData.programs, funds: fundsData.funds };
    }
    return null;
  };

  hasAssets = () => {
    const assets = this.getAssets();
    return assets && (assets.programs.length > 0 || assets.funds.length > 0);
  };
  render() {
    const assets = this.getAssets();
    const { isNewUser } = this.props;
    if (!assets) return null;
    if (!isNewUser)
      return (
        <Surface className="dashboard-portfolio-chart-section">
          <div className="dashboard-portfolio-chart-section__heading">
            Chart
          </div>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer assets={this.getAssets()} />
            <DashboardInRequestsContainer
              cancelRequest={cancelRequest}
              getInRequests={getInRequests}
            />
          </div>
          <DashboardPortfolioChartContainer assets={this.getAssets()} />
        </Surface>
      );

    return (
      <Surface className="dashboard-portfolio-chart-section">
        <DashboardGetStarted />
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
  const { programs, funds } = state.dashboard;
  return {
    isNewUser,
    programsData: programs.itemsData.data,
    fundsData: funds.itemsData.data
  };
};

export default connect(mapStateToProps)(DashboardPortfolioChartSection);
