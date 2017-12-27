import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import store, { history } from '../../store'
import Header from './Header/Header'
import TradersScene from '../TradersScene/TradersScene'
import InvestorScene from '../InvestorScene/InvestorScene'
import LoginScene from '../LoginScene/LoginScene'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />
            <main role='main' className='container'>
              <Route exact path='/' component={TradersScene} />
              <Route exact path='/dashboard' component={InvestorScene} />
              <Route exact path='/login' component={LoginScene} />
            </main>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
