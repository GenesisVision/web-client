import "shared/components/details/details.scss";

import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import AboutLevelsContainerComponent from "shared/components/about-levels/about-levels-container";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import ProgramDetailsHistorySection from "shared/components/programs/program-details/program-trades/program-details-history-section";
import {
  fetchProgramTrades,
  getProgramDescription,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import { INVESTOR } from "shared/constants/constants";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import { fetchPortfolioEvents } from "../../dashboard/services/dashboard-events.services";
import { fetchHistoryCounts } from "./services/program-details.service";

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
    this.description = null;
    this.profitChart = null;
    this.balanceChart = null;
    this.statistic = null;
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
        return getProgramStatistic(this.description.id);
      })
      .then(data => {
        this.profitChart = data.profitChart;
        this.balanceChart = data.balanceChart;
        this.statistic = data.statistic;
        this.setState({ isPending: false });
      })
      .catch(e => {
        this.setState({ isPending: false });
      });
  };

  changeInvestmentStatus = () => {
    this.setState({ isPending: true });
    this.props.service.getProgramDescription(this.description.id).then(data => {
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

    if (!this.description) return null;

    const isInvested =
      this.description.personalProgramDetails &&
      this.description.personalProgramDetails.isInvested;
    return (
      <Page title={this.description.title}>
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
                programDescription={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
                role={INVESTOR}
              />
            </div>
            <div className="details__section">
              <ProgramDetailsStatisticSection
                getProgramStatistic={getProgramStatistic}
                programId={this.description.id}
                currency={currency}
                statistic={this.statistic}
                profitChart={this.profitChart}
                balanceChart={this.balanceChart}
              />
            </div>
            <div className="details__history">
              <ProgramDetailsHistorySection
                fetchHistoryCounts={fetchHistoryCounts}
                fetchPortfolioEvents={filters =>
                  fetchPortfolioEvents({
                    ...filters,
                    assetId: this.description.id
                  })
                }
                fetchTrades={fetchProgramTrades}
                programId={this.description.id}
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
