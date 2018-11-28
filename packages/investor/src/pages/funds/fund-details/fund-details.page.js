import "shared/components/details/details.scss";

import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import FundWithdrawContainer from "modules/fund-withdraw/fund-withdraw-container";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import FundDetailsDescriptionSection from "shared/components/funds/fund-details/fund-details-description/fund-details-description-section";
import FundDetailsStatisticSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistic-section";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import FundDetailsHistorySection from "shared/components/funds/fund-details/fund-details-history-section/fund-details-history-section";
import {
  fetchFundStructure,
  getFundDescription,
  getFundStatistic
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
      .then(data => {
        this.profitChart = data.profitChartData;
        this.balanceChart = data.balanceChartData;
        this.statistic = data.statisticData;
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
          <div className="details">
            <div className="details__section">
              <FundDetailsDescriptionSection
                FundWithdrawContainer={FundWithdrawContainer}
                FundDepositContainer={FundDepositContainer}
                FundDetailContext={FundDetailContext}
                fundDescriptionData={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="details__section">
              <FundDetailsStatisticSection
                getFundStatistic={getFundStatistic}
                programId={this.description.data.id}
                currency={currency}
                statisticData={this.statistic}
                profitChartData={this.profitChart}
                balanceChartData={this.balanceChart}
              />
            </div>
            <div className="details__history">
              <FundDetailsHistorySection
                currency={currency}
                id={this.description.data.id}
                fetchFundStructure={fetchFundStructure}
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundDetailsPage);
