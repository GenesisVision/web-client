import { Redirect, Route, Switch } from 'react-router-dom'
import store, { history } from '../../store'

import { ConnectedRouter } from 'react-router-redux'
import Header from './Header/Header'
import InvestorScene from '../InvestorScene/InvestorScene'
import LoginScene from '../LoginScene/LoginScene'
import NotFoundPage from './NotFoundPage'
import { PrivateRoute } from '../common/PrivateRoute'
import { Provider } from 'react-redux'
import React from 'react'
import TradersRoute from '../TradersRoute/TradersRoute'

const renderHeader = () => (
  <Route path='/:rest' render={({ match }) => (<Header match={match} />)} />
)

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {renderHeader()}
        <main role='main' className='container'>
          <Switch>
            <Route path='/login' component={LoginScene} />
            <Route path='/traders' component={TradersRoute} />
            <PrivateRoute path='/dashboard' component={InvestorScene} />
            <Route exact path='/' render={() => (<Redirect to='/traders' />)} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App
