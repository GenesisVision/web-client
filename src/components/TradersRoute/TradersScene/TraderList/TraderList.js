import React from 'react'
import PropTypes from 'prop-types'
import Trader from './Trader/Trader'

const TraderList = ({ traders, tradersUrl }) => {  

  const traderComponets = traders.map(trader => (
    <Trader
      key={'trader' + trader.id}
      tradersUrl={tradersUrl}
      {...trader}
    />
  ));

  return (
    <div className='list-group'>
      {traderComponets}
    </div>
  );
}

TraderList.propTypes = {
  traders: PropTypes.array.isRequired
}

export default TraderList
