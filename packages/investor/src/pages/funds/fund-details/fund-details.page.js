import "shared/components/details/details.scss";

import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import FundWithdrawContainer from "modules/fund-withdraw/fund-withdraw-container";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import FundDetailsDescriptionSection from "shared/components/funds/fund-details/fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "shared/components/funds/fund-details/fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistic-section";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import {
  fetchFundStructure,
  getFundDescription,
  getFundStatistic
} from "shared/components/funds/fund-details/services/fund-details.service";

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
    this.description = null;
    this.profitChart = null;
    this.balanceChart = null;
    this.statistic = null;
  }

  changeInvestmentStatus = () => {
    this.setState({ isPending: true });
    this.props.service.getFundDescription(this.description.id).then(data => {
      this.description = data;
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
        this.description = data;
        this.setState({ isPending: false });
      })
      .catch(e => {
        const errorCode = e.code;
        this.setState({ errorCode });
      })
      .then(() => {
        this.setState({ isPending: true });
        return getFundStatistic(this.description.id);
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

  render() {
    const { currency, service, isAuthenticated } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    if (!this.description) return null;
    return (
      <Page title={this.description.title}>
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
                fundDescription={this.description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
                onChangeInvestmentStatus={this.changeInvestmentStatus}
              />
            </div>
            <div className="details__section">
              <FundDetailsStatisticSection
                getFundStatistic={getFundStatistic}
                programId={this.description.id}
                currency={currency}
                statistic={this.statistic}
                profitChart={this.profitChart}
                balanceChart={this.balanceChart}
              />
            </div>
            <div className="details__history">
              <FundDetailsHistorySection
                id={this.description.id}
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
