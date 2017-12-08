import React, { Component } from 'react';
import InvestorTrader from './InvestorTrader';

class InvestorTraderList extends Component {
  render() {
    const traders = [...Array(5).keys()];
    const tradersComponents = traders.map((x) => (
      <InvestorTrader trader={x} />
    ));
    return (
      <div>{ tradersComponents }</div>
    );
  }
}

export default InvestorTraderList;
/*
{ tradersComponents }

*/