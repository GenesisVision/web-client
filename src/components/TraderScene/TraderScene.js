import React from 'react'
import Trader from './Trader/Trader'
import { connect } from 'react-redux'
import { fetchTrader } from '../../actions/traderActions'

const TraderScene = ({ match, dispatch, id, traderData }) => {
  const traderUrl = match.url;
  const trader = traderData.trader;
  if (traderData.isFetching) {
    return null;
  }

  if (traderData.error) {
    return (<span>Some Error is occured.</span>);
  }

  if (!trader/* || trader.id !== +id*/) {
    dispatch(fetchTrader(id));
    return null;
  }

  return (
    <Trader trader={trader} traderUrl={traderUrl} />
  );
}

const mapStateToProps = state => ({
  traderData: state.traderData
})

export default connect(
  mapStateToProps,
)(TraderScene)
