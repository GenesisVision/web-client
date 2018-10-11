import "./fund-details.scss";

import Page from "components/page/page";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import NotFoundPage from "../../not-found/not-found.routes";
import FundDetailsDescriptionSection from "./components/fund-details-description-section/fund-details-description-section";
import FundDetailsHistorySection from "./components/fund-details-history-section/fund-details-history-section";
import FundDetailsNavigation from "./components/fund-details-navigation/fund-details-navigation";
import FundDetailsStatisticSection from "./components/fund-details-statistic-section/fund-details-statistic-section";
import {
  getFundDescription,
  getFundRebalancing,
  getFundStatistic
} from "./services/fund-details.service";

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

  componentDidMount() {
    const { service } = this.props;
    this.setState({ isPending: true });
    service
      .getFundDescription()
      .then(data => {
        this.description = data.data;
        this.setState({ isPending: false });
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
      .then(() => {
        this.setState({ isPending: true });
        return getFundRebalancing(this.description.data.id);
      })
      .then(data => {
        this.rebalancing = data;
        this.setState({ isPending: false });
      })
      .catch(e => {
        const errorCode = e.code;
        this.setState({ errorCode });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
  }
  render() {
    const { currency, service } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    if (!this.description.data) return null;
    return (
      <Page title={this.description.data.title}>
        <div className="fund-details">
          <div className="fund-details__section">
            <FundDetailsNavigation goBack={service.goBack} />
            <FundDetailsDescriptionSection
              fundDescriptionData={this.description}
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
              rebalancingData={this.rebalancing}
              eventsData={this.events}
            />
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { accountSettings } = state;

  return {
    currency: accountSettings.currency
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getFundDescription, goBack }, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundDetailsPage);
