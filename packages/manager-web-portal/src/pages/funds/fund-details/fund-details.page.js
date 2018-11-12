import "./fund-details.scss";

import Page from "shared/components/page/page";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import NotFoundPage from "../../not-found/not-found.routes";
import FundDetailsDescriptionSection from "./components/fund-details-description-section/fund-details-description-section";
import FundDetailsHistorySection from "./components/fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./components/fund-details-statistic-section/fund-details-statistic-section";
import {
  getFundDescription,
  getFundStatistic,
  getFundStructure
} from "./services/fund-details.service";

export const FundDetailContext = React.createContext({
  updateDetails: () => {}
});

class FundDetailsPage extends PureComponent {
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

  changeInvestmentStatus = () => {
    this.setState({ isPending: true });
    this.props.service
      .getFundDescription(this.description.data.id)
      .then(data => {
        this.description = data.data;
        this.setState({ isPending: false });
      });
  };

  componentDidMount() {
    this.updateDetails();
  }

  updateDetails = () => {
    const { service } = this.props;
    this.setState({ isPending: true });
    service
      .getFundDescription()
      .then(data => {
        this.description = data.data;
        this.setState({ isPending: false });
      })
      .catch(e => {
        const errorCode = e.code;
        this.setState({ errorCode });
      })
      .then(() => {
        this.setState({ isPending: true });
        return getFundStatistic(this.description.data.id);
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
        return getFundStructure(this.description.data.id);
      })
      .then(({ data }) => {
        this.structure = data.assets;
        this.setState({ isPending: false });
      })
      .catch(e => {
        this.setState({ isPending: false });
      });
  };

  render() {
    const { currency, service, isAuthenticated } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    if (!this.description.data) return null;
    return (
      <Page title={this.description.data.title}>
        <FundDetailContext.Provider
          value={{
            updateDetails: this.updateDetails
          }}
        >
          <div className="fund-details">
            <div className="fund-details__section">
              <FundDetailsDescriptionSection
                fundDescriptionData={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="fund-details__section">
              <FundDetailsStatisticSection
                programId={this.description.data.id}
                currency={currency}
                statisticData={this.statistic}
                profitChartData={this.profitChart}
                balanceChartData={this.balanceChart}
              />
            </div>
            <div className="fund-details__history">
              <FundDetailsHistorySection
                fundId={this.description.data.id}
                currency={currency}
                structure={this.structure}
                eventsData={this.events}
              />
            </div>
          </div>
        </FundDetailContext.Provider>
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
    { getFundDescription, redirectToLogin: () => push(LOGIN_ROUTE) },
    dispatch
  )
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  FundDetailsPage
);
