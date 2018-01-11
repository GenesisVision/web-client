import { connect } from 'react-redux'
import React, { Component } from 'react'

import TraderList from './TraderList/TraderList'
import tradersActions from '../../../actions/tradersActions'

class TradersScene extends Component {
  componentDidMount() {
    this.props.dispatch(tradersActions.fetch());
  }

  render() {
    const { match, tradersInfo } = this.props;
    const { isFetching, traders } = tradersInfo;
    if (isFetching) {
      return null;
    }

    return (
      <TraderList traders={traders} tradersUrl={match.url} />
    );
  }
}

const mapStateToProps = state => ({
  tradersInfo: state.tradersInfo
})

export default connect(
  mapStateToProps
)(TradersScene)
