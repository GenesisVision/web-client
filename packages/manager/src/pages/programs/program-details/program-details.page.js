import "./program-details.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import ProgramDetailsDescriptionSection from "./components/program-details-description-section/program-details-description-section";
import ProgramDetailsHistorySection from "./components/program-details-history-section/program-details-history-section";
import {
  getProgramDescription,
  getProgramHistory,
  getProgramStatistic
} from "./services/program-details.service";

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
    this.trades = null;
  }

  componentDidMount() {
    this.updateDetails();
  }

  updateDetails = () => {
    const { service, currency } = this.props;
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
      .catch()
      .then(data => {
        this.profitChart = data.profitChart;
        this.balanceChart = data.balanceChart;
        this.statistic = data.statistic;
        this.setState({ isPending: false });
      })
      .then(() => {
        this.setState({ isPending: true });
        return getProgramHistory(this.description.id, currency);
      })
      .then(data => {
        this.trades = data.trades;
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
          <div className="program-details">
            <div className="program-details__section">
              <ProgramDetailsDescriptionSection
                programDescription={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="program-details__section">
              <ProgramDetailsStatisticSection
                getProgramStatistic={getProgramStatistic}
                programId={this.description.id}
                currency={currency}
                statistic={this.statistic}
                profitChart={this.profitChart}
                balanceChart={this.balanceChart}
              />
            </div>
            <div className="program-details__history">
              <ProgramDetailsHistorySection
                programId={this.description.id}
                currency={currency}
                trades={this.trades}
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
