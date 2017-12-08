import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard/Dashboard';
import InvestorTradingHistory from './InvestorTradingHistory/InvestorTradingHistory'

class InvestorAccount extends Component {
  state = {
    profitChartData: [],
  };

  componentDidMount() {
    this.setState({
      profitChartData: require('../../data/investor-seed').default
    });
    window.addEventListener('scroll', this.handleOnScroll);
  }
  render() {
    return (
      <div>
        <h1>Total Profit</h1>
        <Dashboard data={this.state.profitChartData} />
        <InvestorTradingHistory />
      </div>
    );
  }
}

export default connect(
  null
)(InvestorAccount)
