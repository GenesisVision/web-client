import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Route from 'react-router/Route'

import Trader from './Trader/Trader'
import traderActions from '../../../actions/traderActions'

import { traderTabUrl } from './TraderScene.constants'

class TraderScene extends Component {
  componentDidMount() {
    this.props.dispatch(traderActions.fetch(this.props.id));
  }

  render() {
    const { match, traderData } = this.props;
    const { trader, isFetching } = traderData;

    if (isFetching) {
      return null;
    }

    return (
      <Switch>
        <Route exact path={match.url} render={() => (<Redirect to={`${match.url}/${traderTabUrl.statistics}`} />)} />
        <Route render={({ match }) => (<Trader trader={trader} match={match} />)} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  traderData: state.traderData
})

export default connect(
  mapStateToProps,
)(TraderScene)
