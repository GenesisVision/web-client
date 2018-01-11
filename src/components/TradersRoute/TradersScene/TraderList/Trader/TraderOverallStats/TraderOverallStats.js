import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import TraderBuyToken from './TraderBuyToken/TraderBuyToken'
import './TraderOverallStats.css'

const TraderOverallStats = (props) => (
  <div className='trader-overall-stats'>
    <div className='row form-group'>
      <div className='col-sm-2'>
        <div><span className='trader-overall-stats__header'>Tokens</span></div>
        <div><NumberFormat value={props.tokens} displayType={'text'} thousandSeparator={true} /></div>
      </div>
      <div className='col-sm-2'>
        <div><span className='trader-overall-stats__header'>Currency</span></div>
        <div>{props.currency}</div>
      </div>
      <div className='col-sm-2'>
        <TraderBuyToken id={props.id} tokens={props.tokens}/>
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <div><span className='trader-overall-stats__header'>Trades</span></div>
        <div>{props.trades}</div>
      </div>
      <div className='col'>
        <div><span className='trader-overall-stats__header'>Weeks</span></div>
        <div>{props.weeks}</div>
      </div>
      <div className='col'>
        <div><span className='trader-overall-stats__header'>Profit Total</span></div>
        <div><NumberFormat value={props.totalProfit} displayType={'text'} suffix={'%'} /></div>
      </div>
      <div className='col'>
        <div><span className='trader-overall-stats__header'>Last Profit</span></div>
        <div><NumberFormat value={props.lastProfit} displayType={'text'} suffix={'%'} /></div>
      </div>
    </div>
  </div>
)

TraderOverallStats.propTypes = {
  id: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  tokens: PropTypes.number.isRequired,
  totalProfit: PropTypes.number.isRequired,
  lastProfit: PropTypes.number.isRequired,
  trades: PropTypes.number.isRequired,
  weeks: PropTypes.number.isRequired
}



export default TraderOverallStats;
