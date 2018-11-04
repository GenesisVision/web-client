import "./program-details.scss";

import Page from "components/page/page";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { goBack, push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import NotFoundPage from "../../not-found/not-found.routes";
import ProgramDetailsDescriptionSection from "./components/program-details-description-section/program-details-description-section";
import ProgramDetailsHistorySection from "./components/program-details-history-section/program-details-history-section";
import ProgramDetailsStatisticSection from "./components/program-details-statistic-section/program-details-statistic-section";
import {
  getProgramDescription,
  getProgramHistory,
  getProgramStatistic
} from "./services/program-details.service";
import BackButton from "components/back-button/back-button";

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
        return getProgramStatistic(this.description.data.id);
      })
      .catch()
      .then(data => {
        this.profitChart = data.profitChartData;
        this.balanceChart = data.balanceChartData;
        this.statistic = data.statisticData;
        this.setState({ isPending: false });
      })
      .then(() => {
        this.setState({ isPending: true });
        return getProgramHistory(this.description.data.id, currency);
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
    this.props.service
      .getProgramDescription(this.description.data.id)
      .then(data => {
        this.description = data;
        this.setState({ isPending: false });
      });
  };

  render() {
    const { currency, isAuthenticated, service, backPath } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    if (!this.description.data) return null;

    return (
      <Page title={this.description.data.title}>
        <ProgramDetailContext.Provider
          value={{
            updateDetails: this.updateDetails
          }}
        >
          <div className="program-details">
            <div className="program-details__section">
              {backPath && (
                <BackButton backPath={backPath} goBack={service.goBack} />
              )}
              <ProgramDetailsDescriptionSection
                programDescriptionData={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="program-details__section">
              <ProgramDetailsStatisticSection
                programId={this.description.data.id}
                currency={currency}
                statisticData={this.statistic}
                profitChartData={this.profitChart}
                balanceChartData={this.balanceChart}
              />
            </div>
            <div className="program-details__history">
              <ProgramDetailsHistorySection
                programId={this.description.data.id}
                currency={currency}
                tradesData={this.trades}
                eventsData={this.events}
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { accountSettings, authData, routing } = state;
  return {
    backPath: routing.location.state,
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getProgramDescription, goBack, redirectToLogin: () => push(LOGIN_ROUTE) },
    dispatch
  )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
