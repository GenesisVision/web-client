import "./dashboard-portfolio-chart-section.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import { dashboardAssetsSelector } from "../../reducers/dashboard-assets.reducer";
import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import { getInRequests } from "../../services/dashboard-in-requests.service";
import { composeAssetChart, getAssets } from "../../services/dashboard.service";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardPortfolioChartSection, {
  IDashboardPortfolioChartSectionProps
} from "./dashboard-portfolio-chart-section";

class _DashboardPortfolioChartSectionContainer extends React.PureComponent<
  Props
> {
  componentDidMount() {
    const { service } = this.props;
    service.getAssets();
    service.getInRequests();
  }

  componentDidUpdate() {
    const { assets, service, assetChart } = this.props;
    if (assets && !assetChart) service.composeAssetChart();
  }

  render() {
    const { t, isNewUser, assets, assetChart, period, inRequests } = this.props;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <DashboardPortfolioChartSection
        assets={assets}
        assetChart={assetChart}
        period={period}
        inRequests={inRequests}
      />
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  isNewUser: isNewUserSelector(state),
  assets: dashboardAssetsSelector(state),
  inRequests: dashboardInRequestsSelector(state),
  assetChart: state.dashboard.assetChart,
  period: state.dashboard.period
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getAssets, composeAssetChart, getInRequests },
    dispatch
  )
});

interface Props extends DispatchProps, StateProps, OwnProps, WithTranslation {}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssets: typeof getAssets;
  composeAssetChart: typeof composeAssetChart;
  getInRequests: typeof getInRequests;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

interface StateProps extends IDashboardPortfolioChartSectionProps {
  isNewUser?: boolean;
}

const DashboardPortfolioChartSectionContainer = compose<
  React.ComponentType<OwnProps>
>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_DashboardPortfolioChartSectionContainer);
export default DashboardPortfolioChartSectionContainer;
