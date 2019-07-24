import "./dashboard-portfolio-chart-section.scss";

import { DashboardChartValue, ProgramRequests } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import {
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardChartStatsLoader from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-stats-loader";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isNewUserSelector } from "shared/reducers/header-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import {
  dashboardPortfolioChartPeriodSelector,
  dashboardPortfolioChartSelector
} from "../../reducers/dashboard-portfolio-chart.reducer";
import { getPortfolioChart } from "../../services/dashboard-chart.service";
import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardPortfolioChartSection from "./dashboard-portfolio-chart-section";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

class _DashboardPortfolioChartSectionContainer extends React.PureComponent<
  Props
> {
  componentDidMount() {
    // service.getPortfolioChart(period.start, period.end);
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.currency !== this.props.currency) {
      this.props.service.getPortfolioChart(
        this.props.period.start,
        this.props.period.end
      );
    }
  }

  handleChangePeriod = (period: ChartDefaultPeriod) => {
    this.props.service.getPortfolioChart(period.start, period.end);
    this.setState({ period });
  };

  render() {
    const {
      t,
      period,
      portfolioChartData,
      currency,
      isNewUser,
      inRequests
    } = this.props;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {t("investor.dashboard-page.chart-section.header")}
        </h3>
        <DashboardInRequestsContainer
          condition={!!inRequests}
          loader={<DashboardChartRequestLoader />}
          inRequests={inRequests!}
          cancelRequest={cancelRequest}
        />
        <DashboardPortfolioChartStat
          condition={!!portfolioChartData}
          loader={<DashboardChartStatsLoader />}
          currency={currency}
          portfolioChartData={portfolioChartData!}
        />
        {/*<DashboardPortfolioChartSection
          condition={!!portfolioChartData}
          loader={<DashboardChartLoader />}
          period={period}
          data={portfolioChartData!}
          currency={currency}
          handleChangePeriod={this.handleChangePeriod}
        /> */}
      </>
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  period: dashboardPortfolioChartPeriodSelector(state),
  portfolioChartData: dashboardPortfolioChartSelector(state),
  inRequests: dashboardInRequestsSelector(state),
  currency: currencySelector(state),
  isNewUser: isNewUserSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators({ getPortfolioChart }, dispatch)
});

interface Props extends OwnProps, StateProps, DispatchProps, WithTranslation {}

interface OwnProps {}

interface StateProps {
  currency: CurrencyEnum;
  period: ChartDefaultPeriod;
  portfolioChartData?: DashboardChartValue;
  inRequests?: ProgramRequests;
  isNewUser: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getPortfolioChart: typeof getPortfolioChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardPortfolioChartSectionContainer = compose<
  React.ComponentType<OwnProps>
>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, InvestorRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_DashboardPortfolioChartSectionContainer);
export default DashboardPortfolioChartSectionContainer;
