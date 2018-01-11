import { createStore, applyMiddleware, compose } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import history from '../utils/history'
import rootReducer from '../reducers'

const initialState = {
}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
  })
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
