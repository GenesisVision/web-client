import "./dashboard-portfolio-chart-section.scss";

import { ManagerAssets, ProgramRequests } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  DashboardChartAssetsLoader,
  DashboardChartDescriptionLoader,
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import Surface from "shared/components/surface/surface";
import { Nullable } from "shared/utils/types";

import { IDashboardAssetChart } from "../../reducers/dashboard.reducers";
import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import { composeAssetChart, getAssets } from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

class _DashboardPortfolioChartSection extends React.PureComponent<Props> {
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
    const {
      t,
      isNewUser,
      assets,
      assetsIsPending,
      assetChart,
      period,
      inRequests,
      inRequestsIsPending
    } = this.props;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <Surface className="dashboard-portfolio-chart-section">
        <h3 className="dashboard-portfolio-chart-section__heading">
          {t("manager.dashboard-page.chart-section.header")}
        </h3>
        <div className="dashboard-portfolio-chart-section__actions">
          <DashboardChartAssetsContainer
            condition={!!assets && !assetsIsPending}
            loader={<DashboardChartAssetsLoader />}
            assets={assets!}
          />
          <DashboardInRequestsContainer
            condition={!!inRequests && !inRequestsIsPending}
            loader={<DashboardChartRequestLoader />}
            inRequests={inRequests!}
            cancelRequest={cancelRequest}
          />
        </div>
        <DashboardPortfolioChartContainer
          condition={!!assetChart && !!period}
          loader={
            <>
              <DashboardChartDescriptionLoader />
              <DashboardChartLoader />
            </>
          }
          period={period}
          assetChart={assetChart!}
        />
      </Surface>
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => {
  const { profileHeader } = state;
  const { assets, assetChart, period, inRequestsData } = state.dashboard;
  return {
    isNewUser: profileHeader.data && profileHeader.data.isNewUser,
    assets: assets.data,
    assetsIsPending: assets.isPending,
    inRequests: inRequestsData.data,
    inRequestsIsPending: inRequestsData.isPending,
    assetChart,
    period
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getAssets, composeAssetChart, getInRequests },
    dispatch
  )
});

interface Props
  extends DispatchProps,
    StateProps,
    OwnProps,
    InjectedTranslateProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssets: typeof getAssets;
  composeAssetChart: typeof composeAssetChart;
  getInRequests: typeof getInRequests;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  assetsIsPending: boolean;
  inRequestsIsPending: boolean;
  period: ChartDefaultPeriod;
  assetChart: Nullable<IDashboardAssetChart>;
  isNewUser?: boolean;
  assets?: ManagerAssets;
  inRequests?: ProgramRequests;
}

interface OwnProps {}

const DashboardPortfolioChartSection = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_DashboardPortfolioChartSection);
export default DashboardPortfolioChartSection;
