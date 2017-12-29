import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import tradersReducer from './tradersReducer'
import investorProfitReducer from './investorProfitReducer'
import authReducer from './authReducer'
import traderReducer from './traderReducer'

export default combineReducers({
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  tradersInfo: tradersReducer,
  traderData: traderReducer,
  investorProfit: investorProfitReducer,
  auth: authReducer
})
