import PropTypes from 'prop-types'
import React from 'react'
import TraderCard from './TraderCard/TraderCard'
import TraderTabs from './TraderTabs/TraderTabs'

const Trader = ({ trader, traderUrl }) => (
  <div>
    <TraderCard name={trader.name} description={trader.description} />
    <br />
    <TraderTabs traderUrl={traderUrl} />
  </div>
)

Trader.propTypes = {
  trader: PropTypes.object.isRequired
}

export default Trader
