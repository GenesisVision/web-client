import "./dashboard-portfolio-chart-section.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  DashboardChartAssetsLoader,
  DashboardChartDescriptionLoader,
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";

import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import { composeAssetChart, getAssets } from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class DashboardPortfolioChartSection extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getAssets();
    service.getInRequests();
  }

  componentDidUpdate(prevProps) {
    const { assets, service, assetChart } = this.props;
    if (
      assets &&
      (JSON.stringify(prevProps.assetChart) !== JSON.stringify(assetChart) ||
        !assetChart)
    )
      service.composeAssetChart();
  }

  render() {
    const {
      t,
      isNewUser,
      assets,
      assetsIsPending,
      assetChart,
      period,
      currency,
      inRequests,
      inRequestsIsPending
    } = this.props;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <Fragment>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {t("manager.dashboard-page.chart-section.header")}
        </h3>
        <div className="dashboard-portfolio-chart-section__actions">
          <DashboardChartAssetsContainer
            condition={!!assets && !assetsIsPending}
            loader={<DashboardChartAssetsLoader />}
            assets={assets}
          />
          <DashboardInRequestsContainer
            condition={!!inRequests && !inRequestsIsPending}
            loader={<DashboardChartRequestLoader />}
            inRequests={inRequests}
            cancelRequest={cancelRequest}
          />
        </div>
        <DashboardPortfolioChartContainer
          condition={!!assetChart && !!period && !!currency}
          loader={
            <Fragment>
              <DashboardChartDescriptionLoader />
              <DashboardChartLoader />
            </Fragment>
          }
          currency={currency}
          period={period}
          assetChart={assetChart}
          key={!assets}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { info } = state.profileHeader;
  const { currency } = state.accountSettings;
  const { assets, assetChart, period, inRequestsData } = state.dashboard;
  return {
    isNewUser: info.data && info.data.isNewUser,
    assets: assets.data,
    assetsIsPending: assets.isPending,
    inRequests: inRequestsData.data,
    inRequestsIsPending: inRequestsData.isPending,
    assetChart,
    period,
    currency
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      { getAssets, composeAssetChart, getInRequests },
      dispatch
    )
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPortfolioChartSection);
