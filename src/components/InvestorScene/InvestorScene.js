import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import InvestorTradingHistory from './InvestorTradingHistory/InvestorTradingHistory'
import { fetchInvestorProfit } from '../../actions/investorProfitActions'

const mapStateToProps = state => ({
  investorProfit: state.investorProfit
})

const InvestorScene = props => {
  if(!props.investorProfit.isRequested){
    props.dispatch(fetchInvestorProfit());
    return (null);
  }

  if(props.investorProfit.isFetching){
    return (null);
  }

  return (
    <div>
      <h1>Total Profit</h1>
      <Dashboard data={props.investorProfit.chart} />
      <br />
      <InvestorTradingHistory trades={props.investorProfit.trades} />
    </div>
  );
}

export default connect(
  mapStateToProps
)(InvestorScene)
