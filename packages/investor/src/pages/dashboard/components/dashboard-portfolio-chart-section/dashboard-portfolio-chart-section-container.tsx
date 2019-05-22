import "./dashboard-portfolio-chart-section.scss";

import { DashboardChartValue } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { DashboardChartLoader } from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardChartStatsLoader from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-stats-loader";
import { CurrencyEnum } from "shared/utils/types";

import { getPortfolioChart } from "../../../services/dashboard-chart.service";
import DashboardGetStarted from "../dashboard-get-started";
import DashboardPortfolioChartSection from "./dashboard-portfolio-chart-section";

class _DashboardPortfolioChartSectionContainer extends React.PureComponent<
  Props,
  State
> {
  state = {
    period: DEFAULT_PERIOD
  };

  componentDidMount() {
    const { period } = this.state;
    this.props.service.getPortfolioChart(period.start, period.end);
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.currency !== this.props.currency) {
      this.props.service.getPortfolioChart(
        this.state.period.start,
        this.state.period.end
      );
    }
  }

  handleChangePeriod = (period: ChartDefaultPeriod) => {
    this.props.service.getPortfolioChart(period.start, period.end);
    this.setState({ period });
  };

  render() {
    const { data, currency, isPending, isNewUser } = this.props;
    const { period } = this.state;
    if (isNewUser) return <DashboardGetStarted />;
    return (
      <DashboardPortfolioChartSection
        condition={!isPending && !!data}
        loader={
          <>
            <DashboardChartStatsLoader />
            <DashboardChartLoader />
          </>
        }
        period={period}
        data={data!}
        currency={currency}
        handleChangePeriod={this.handleChangePeriod}
      />
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => {
  const { info } = state.profileHeader;
  const { data, isPending } = state.dashboard.portfolioChartData;
  const { currency } = state.accountSettings;
  return {
    data,
    isPending,
    currency,
    isNewUser: info.data ? info.data.isNewUser : false
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators({ getPortfolioChart }, dispatch)
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {}

interface StateProps {
  currency: CurrencyEnum;
  data?: DashboardChartValue;
  isPending: boolean;
  isNewUser: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  period: ChartDefaultPeriod;
}

const DashboardPortfolioChartSectionContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  InvestorRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_DashboardPortfolioChartSectionContainer);
export default DashboardPortfolioChartSectionContainer;
