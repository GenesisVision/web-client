import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import store, { history } from '../../store'
import Header from './Header';
import TraderScene from '../TradersScene/TraderScene'
import InvestorAccount from '../InvestorAccount/InvestorAccount'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />
            <main role='main' className='container'>
              <Route exact path='/' component={TraderScene} />
              <Route exact path='/dashboard' component={InvestorAccount} />
            </main>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
