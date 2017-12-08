import React from 'react'
import PropTypes from 'prop-types'
import Trader from './Trader/Trader'

const TraderList = (props) => {  
  if(props.trader.isFetching){
    return (null);
  }

  const traderComponets = props.trader.items.map(trader => (
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
  trader: PropTypes.object.isRequired
}

export default TraderList
