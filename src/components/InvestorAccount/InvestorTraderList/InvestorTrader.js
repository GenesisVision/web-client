import React, { Component } from 'react';

class InvestorTrader extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-3'>
          Trader Name
        </div>
        <div className='col-sm-3'>
          Trader Graph
        </div>
        <div className='col-sm-6'>
          - 50 tokens
        </div>
      </div>
    );
  }
}

export default InvestorTrader;
