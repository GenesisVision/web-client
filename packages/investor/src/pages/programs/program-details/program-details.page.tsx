import "shared/components/details/details.scss";

import { ProgramBalanceChart, ProgramDetailsFull } from "gv-api-web";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { InvestorRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
import AboutLevelsContainerComponent from "shared/components/about-levels/about-levels-container";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import ProgramDetailsHistorySection from "shared/components/programs/program-details/program-trades/program-details-history-section";
import {
  fetchOpenPositions,
  fetchProgramTrades,
  getProgramDescription,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "shared/components/programs/program-details/services/program-details.types";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { ResponseError } from "shared/utils/types";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import { fetchPortfolioEvents } from "../../dashboard/services/dashboard-events.services";
import ProgramControls from "./components/program-controls";
import { ProgramDetailContext } from "./helpers/program-details-context";
import { fetchHistoryCounts } from "./services/program-details.service";

interface IProgramDetailsPageOwnProps {}

interface IProgramDetailsPageProps extends IProgramDetailsPageOwnProps {
  isAuthenticated: boolean;
  currency: string;
  service: {
    getProgramDescription(): Promise<ProgramDetailsFull>;
    redirectToLogin(): void;
  };
}

interface IProgramDetailsPageState {
  isPending: boolean;
  hasError: boolean;
  description?: ProgramDetailsFull;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
  statistic?: ProgramDetailsStatistic;
}

class ProgramDetailsPage extends PureComponent<
  IProgramDetailsPageProps,
  IProgramDetailsPageState
> {
  constructor(props: IProgramDetailsPageProps) {
    super(props);
    this.state = {
      hasError: false,
      isPending: false,
      description: undefined,
      profitChart: undefined,
      balanceChart: undefined,
      statistic: undefined
    };
  }

  componentDidMount() {
    this.updateDetails();
  }

  refreshProgramDescription = () => {
    const { service } = this.props;
    this.setState({ isPending: true });
    return service
      .getProgramDescription()
      .then(data => {
        this.setState({ isPending: false, description: data });
      })
      .catch((e: ResponseError) => {
        this.setState({ hasError: true });
        throw e;
      });
  };

  updateDetails = () => {
    this.refreshProgramDescription()
      .then(() => {
        this.setState({ isPending: true });
        return getProgramStatistic(this.state.description!.id);
      })
      .then(data => {
        this.setState({ isPending: false, ...data });
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
  };

  render() {
    const { currency, isAuthenticated, service } = this.props;
    const {
      hasError,
      description,
      statistic,
      profitChart,
      balanceChart
    } = this.state;

    if (hasError) {
      return <NotFoundPage />;
    }

    if (!description) return null;
    return (
      <Page title={description.title}>
        <ProgramDetailContext.Provider
          value={{
            updateDetails: this.updateDetails
          }}
        >
          <div className="details">
            <div className="details__section">
              <ProgramDetailsDescriptionSection
                toggleReinvesting={toggleReinvesting}
                AboutLevelsContainerComponent={AboutLevelsContainerComponent}
                ProgramWithdrawContainer={ProgramWithdrawContainer}
                ProgramReinvestingWidget={ProgramReinvestingWidget}
                programDescription={description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.refreshProgramDescription}
                ProgramControls={ProgramControls}
              />
            </div>
            <div className="details__section">
              <ProgramDetailsStatisticSection
                status={description.status}
                getProgramStatistic={getProgramStatistic}
                programId={description.id}
                currency={currency}
                statistic={statistic}
                profitChart={profitChart}
                balanceChart={balanceChart}
              />
            </div>
            <div className="details__history">
              <ProgramDetailsHistorySection
                fetchOpenPositions={fetchOpenPositions}
                fetchHistoryCounts={fetchHistoryCounts}
                fetchPortfolioEvents={(filters: any) =>
                  fetchPortfolioEvents({
                    ...filters,
                    assetId: description.id
                  })
                }
                fetchTrades={fetchProgramTrades}
                programId={description.id}
                programCurrency={description.currency}
                currency={currency}
                isInvested={
                  description.personalProgramDetails &&
                  description.personalProgramDetails.isInvested
                }
                eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
    );
  }
}

const mapStateToProps = (state: InvestorRootState) => {
  const { accountSettings, authData } = state;
  return {
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    { getProgramDescription, redirectToLogin: () => push(LOGIN_ROUTE) },
    dispatch
  )
});

export default compose<ComponentType<IProgramDetailsPageOwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
