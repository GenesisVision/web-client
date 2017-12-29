import React from 'react'
import { connect } from 'react-redux'
import TraderList from './TraderList/TraderList'
import { fetchTraders } from '../../actions/tradersActions'

const TradersScene = ({dispatch, tradersInfo}) => {
  if (!tradersInfo.isRequested) {
    dispatch(fetchTraders());
    return null;
  }

  if (tradersInfo.isFetching) {
    return null;
  }

  return (
    <TraderList tradersInfo={tradersInfo} />
  );
}

const mapStateToProps = state => ({
  tradersInfo: state.tradersInfo
})

export default connect(
  mapStateToProps
)(TradersScene)
