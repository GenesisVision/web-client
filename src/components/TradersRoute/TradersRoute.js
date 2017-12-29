import React from 'react'
import { Route, Switch } from 'react-router-dom'
import TraderScene from '../TraderScene/TraderScene'
import TradersScene from '../TradersScene/TradersScene'

const TradersRoute = ({match}) => (
  <Switch>
    <Route path={`${match.url}/:traderId`} component={TraderScene} />
    <Route exact path={match.url} component={TradersScene} />
  </Switch>
)

export default TradersRoute
