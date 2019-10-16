import "./dashboard-portfolio-chart-section.scss";

import { ManagerAssets, ProgramRequests } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  DashboardChartAssetsLoader,
  DashboardChartDescriptionLoader,
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { IDashboardAssetChart } from "shared/constants/constants";
import { isNewUserSelector } from "shared/reducers/header-reducer";
import { Nullable } from "shared/utils/types";

import { dashboardAssetsSelector } from "../../reducers/dashboard-assets.reducer";
import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import { composeAssetChart, getAssets } from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

enum TABS {
  PROGRAMS = "Program",
  FUNDS = "Fund"
}

class _DashboardPortfolioChartSection extends React.PureComponent<
  Props,
  State
> {
  state = {
    tab: TABS.PROGRAMS,
    type: undefined
  };

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) => {
    this.setState({ tab: tab as TABS });
    this.setTypeAssets(tab);
  };

  setDefaultTab = () => {
    const { assets } = this.props;
    switch (true) {
      case !!assets!.programs.length:
        this.setState({ tab: TABS.PROGRAMS });
        break;
      case !!assets!.funds.length:
        this.setState({ tab: TABS.FUNDS });
        break;
    }
  };

  setTypeAssets = (tab?: string) => {
    const { assets } = this.props;
    switch (true) {
      case assets!.programs.length && tab === TABS.PROGRAMS:
        this.setState({ type: ASSETS_TYPES.Program });
        break;
      case assets!.funds.length && tab === TABS.FUNDS:
        this.setState({ type: ASSETS_TYPES.Fund });
        break;
    }
  };

  componentDidMount() {
    const { service } = this.props;
    service.getAssets();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { assets, service, assetChart, inRequests } = this.props;
    const { tab, type } = this.state;
    if (!assets) return null;
    if (!type) {
      this.setDefaultTab();
      this.setTypeAssets(tab);
    }
    if ((!assetChart || prevState.tab !== tab) && type) {
      service.composeAssetChart(type);
    }
    if ((!inRequests || prevState.tab !== tab) && type) {
      service.getInRequests(type);
    }
  }

  render() {
    const { t, isNewUser, assets, assetChart, period, inRequests } = this.props;
    const { tab } = this.state;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <Surface className="dashboard-portfolio-chart-section">
        <div className="dashboard-portfolio-chart-section__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={TABS.PROGRAMS}
              label={t(`manager.dashboard-page.assets.programs`)}
              visible={!!assets && !!assets.programs.length}
            />
            <GVTab
              value={TABS.FUNDS}
              label={t(`manager.dashboard-page.assets.funds`)}
              visible={!!assets && !!assets.funds.length}
            />
          </GVTabs>
        </div>
        {tab === TABS.PROGRAMS && (
          <>
            <div className="dashboard-portfolio-chart-section__actions">
              <DashboardChartAssetsContainer
                condition={!!assets && !!assets.programs.length}
                loader={<DashboardChartAssetsLoader />}
                assets={assets! && assets!.programs}
                type={ASSETS_TYPES.Program}
              />
              <DashboardInRequestsContainer
                condition={!!inRequests}
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
          </>
        )}
        {tab === TABS.FUNDS && (
          <>
            <div className="dashboard-portfolio-chart-section__actions">
              <DashboardChartAssetsContainer
                condition={!!assets && !!assets.funds.length}
                loader={<DashboardChartAssetsLoader />}
                assets={assets! && assets!.funds}
                type={ASSETS_TYPES.Fund}
              />
              <DashboardInRequestsContainer
                condition={!!inRequests}
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
          </>
        )}
      </Surface>
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

interface State {
  tab: TABS;
  type?: ASSETS_TYPES;
}

interface StateProps {
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
