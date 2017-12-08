import React from 'react'
import PropTypes from 'prop-types'
import TraderProfile from './TraderProfile/TraderProfile'
import TraderOverallStats from './TraderOverallStats/TraderOverallStats'
import TraderChart from './TraderChart/TraderChart'
import './Trader.css';

const Trader = (props) => (
  <div className='list-group-item'>
    <div className='row'>
      <div className='col-4'>
        <TraderProfile
          id={props.id}
          name={props.name}
          description={props.description}
        />
      </div>
      <div className='col-2'>
        <TraderChart
          chart={props.chart} />
      </div>
      <div className='col-6'>
        <TraderOverallStats
          id={props.id}
          currency={props.currency}
          tokens={props.tokens}
          totalProfit={props.totalProfit}
          lastProfit={props.lastProfit}
          trades={props.trades}
          weeks={props.weeks}
        />
      </div>
    </div>
  </div>
)

Trader.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  chart: PropTypes.array.isRequired,
  currency: PropTypes.string,
  tokens: PropTypes.number,
  totalProfit: PropTypes.number.isRequired,
  lastProfit: PropTypes.number.isRequired,
  trades: PropTypes.number.isRequired,
  weeks: PropTypes.number.isRequired
}

Trader.defaultProps = {
  currency: 'USD'
};

export default Trader;
