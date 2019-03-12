import "shared/components/details/details.scss";

import { ProgramBalanceChart, ProgramDetailsFull } from "gv-api-web";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/login/login.service";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
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
import RootState from "shared/reducers/root-reducer";
import { ResponseError } from "shared/utils/types";

import { IDescriptionSection, IHistorySection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-trades/program-details-history-section";

interface IProgramDetailsPageOwnProps {
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
}

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
    this.getDetails();
  }

  updateDetails = () => {
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

  getDetails = () => {
    this.updateDetails()
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

  fetchHistoryPortfolioEvents = (filters: any) => {
    const { description } = this.state;
    const { historySection } = this.props;
    return historySection.fetchPortfolioEvents({
      ...filters,
      assetId: description!.id
    });
  };

  render() {
    const {
      currency,
      isAuthenticated,
      service,
      descriptionSection,
      historySection
    } = this.props;
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
    const isInvested =
      description.personalProgramDetails &&
      description.personalProgramDetails.isInvested;
    return (
      <Page title={description.title}>
        <ProgramDetailContext.Provider
          value={{ updateDetails: this.updateDetails }}
        >
          <div className="details">
            <div className="details__section">
              <ProgramDetailsDescriptionSection
                accountCurrency={currency}
                programDescription={description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                ProgramControls={descriptionSection.ProgramControls}
                ChangePasswordTradingAccount={
                  descriptionSection.ChangePasswordTradingAccount
                }
                ProgramWithdrawContainer={
                  descriptionSection.ProgramWithdrawContainer
                }
                ProgramReinvestingWidget={
                  descriptionSection.ProgramReinvestingWidget
                }
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
                fetchTrades={fetchProgramTrades}
                fetchPortfolioEvents={this.fetchHistoryPortfolioEvents}
                fetchHistoryCounts={historySection.fetchHistoryCounts}
                programId={description.id}
                programCurrency={description.currency}
                currency={currency}
                isInvested={isInvested}
                eventTypeFilterValues={historySection.eventTypeFilterValues}
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { accountSettings, authData } = state;
  return {
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    { getProgramDescription, redirectToLogin },
    dispatch
  )
});

export default compose<ComponentType<IProgramDetailsPageOwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
