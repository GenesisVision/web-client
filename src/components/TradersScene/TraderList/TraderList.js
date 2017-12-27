import React from 'react'
import PropTypes from 'prop-types'
import Trader from './Trader/Trader'

const TraderList = props => {  
  if(props.tradersInfo.isFetching){
    return (null);
  }

  const traderComponets = props.tradersInfo.items.map(trader => (
      <Trader
        key={'trader' + trader.id}
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
  tradersInfo: PropTypes.object.isRequired
}

export default TraderList
