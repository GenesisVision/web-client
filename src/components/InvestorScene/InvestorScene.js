import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import InvestorTradingHistory from './InvestorTradingHistory/InvestorTradingHistory'
import investorProfitActions from '../../actions/investorProfitActions'

class InvestorScene extends Component {
  componentDidMount() {
    this.props.dispatch(investorProfitActions.fetch());
  }

  render() {
    const { investorProfit } = this.props;
    if (investorProfit.isFetching) {
      return null;
    }

    return (
      <div>
        <h1>Total Profit</h1>
        <Dashboard data={investorProfit.chart} />
        <br />
        <InvestorTradingHistory trades={investorProfit.trades} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  investorProfit: state.investorProfit
})

export default connect(
  mapStateToProps
)(InvestorScene)
