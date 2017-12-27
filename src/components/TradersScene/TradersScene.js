import React from 'react'
import { connect } from 'react-redux'
import TraderList from './TraderList/TraderList'
import { fetchTraders } from '../../actions/tradersActions'

const mapStateToProps = state => ({
  tradersInfo: state.tradersInfo
})

const TradersScene = props => {
  if (!props.tradersInfo.isRequested) {
    props.dispatch(fetchTraders());
    return (null);
  }

  if (props.tradersInfo.isFetching) {
    return (null);
  }

  return (
    <TraderList tradersInfo={props.tradersInfo} />
  );
}

export default connect(
  mapStateToProps
)(TradersScene)
