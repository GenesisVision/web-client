import "shared/components/details/details.scss";

import Page from "shared/components/page/page";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsHistorySection from "shared/components/programs/program-details/program-trades/program-details-history-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  getProgramDescription,
  getProgramHistory,
  getProgramStatistic,
  getProgramTrades
} from "./services/program-details.service";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import AboutLevelsContainerComponent from "pages/app/components/about-levels/about-levels-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { fetchPortfolioEvents } from "../../dashboard/services/dashboard-events.services";

export const ProgramDetailContext = React.createContext({
  updateDetails: () => {}
});

class ProgramDetailsPage extends PureComponent {
  state = {
    errorCode: null,
    isPending: false
  };

  constructor(props) {
    super(props);
    this.description = { data: null, isPending: true };
    this.profitChart = { data: null, isPending: true };
    this.balanceChart = { data: null, isPending: true };
    this.statistic = { data: null, isPending: true };
    this.trades = { data: null, isPending: true };
  }

  componentDidMount() {
    this.updateDetails();
  }

  updateDetails = () => {
    const { service } = this.props;
    this.setState({ isPending: true });
    service
      .getProgramDescription()
      .then(data => {
        this.description = data;
        this.setState({ isPending: false });
      })
      .catch(e => {
        const errorCode = e.code;
        this.setState({ errorCode });
      })
      .then(() => {
        this.setState({ isPending: true });
        return getProgramStatistic(this.description.data.id);
      })
      .then(data => {
        this.profitChart = data.profitChartData;
        this.balanceChart = data.balanceChartData;
        this.statistic = data.statisticData;
      })
      .catch(e => {
        this.setState({ isPending: false });
      });
  };

  changeInvestmentStatus = () => {
    this.setState({ isPending: true });
    this.props.service
      .getProgramDescription(this.description.data.id)
      .then(data => {
        this.description = data;
        this.setState({ isPending: false });
      });
  };

  render() {
    const { currency, isAuthenticated, service } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    if (!this.description.data) return null;

    const isInvested =
      this.description.data.personalProgramDetails &&
      this.description.data.personalProgramDetails.isInvested;
    return (
      <Page title={this.description.data.title}>
        <ProgramDetailContext.Provider
          value={{
            updateDetails: this.updateDetails
          }}
        >
          <div className="details">
            <div className="details__section">
              <ProgramDetailsDescriptionSection
                toggleReinvesting={toggleReinvesting}
                ProgramDepositContainer={ProgramDepositContainer}
                AboutLevelsContainerComponent={AboutLevelsContainerComponent}
                ProgramDetailContext={ProgramDetailContext}
                ProgramWithdrawContainer={ProgramWithdrawContainer}
                ProgramReinvestingWidget={ProgramReinvestingWidget}
                programDescriptionData={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="details__section">
              <ProgramDetailsStatisticSection
                getProgramStatistic={getProgramStatistic}
                programId={this.description.data.id}
                currency={currency}
                statisticData={this.statistic}
                profitChartData={this.profitChart}
                balanceChartData={this.balanceChart}
              />
            </div>
            <div className="details__history">
              <ProgramDetailsHistorySection
                fetchPortfolioEvents={filters =>
                  fetchPortfolioEvents({
                    ...filters,
                    assetId: this.description.data.id
                  })
                }
                programId={this.description.data.id}
                currency={currency}
                isInvested={isInvested}
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { accountSettings, authData } = state;
  return {
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getProgramDescription, redirectToLogin: () => push(LOGIN_ROUTE) },
    dispatch
  )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
