import "./dashboard-portfolio-chart-section.scss";

import Surface from "components/surface/surface";
import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardInRequestsContainer from "./dashboard-in-requests/dashboard-in-requests-container";

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
    if (!assets) return null;
    if (assets.programs.length > 0 || assets.funds.length > 0)
      return (
        <Surface className="dashboard-portfolio-chart-section">
          <div className="dashboard-portfolio-chart-section__heading">
            Chart
          </div>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer assets={this.getAssets()} />
            <DashboardInRequestsContainer />
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
  const { programs, funds } = state.dashboard;
  return {
    programsData: programs.itemsData.data,
    fundsData: funds.itemsData.data
  };
};

export default connect(mapStateToProps)(DashboardPortfolioChartSection);
