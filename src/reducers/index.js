import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { TRADERS_REQUEST, TRADERS_REQUEST_SUCCESS, BUY_TOKEN_REQUEST, BUY_TOKEN_REQUEST_SUCCESS } from '../actions'

const trader = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case TRADERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case TRADERS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
        lastUpdated: action.lastUpdated
      }
    case BUY_TOKEN_REQUEST:
      return {
        ...state,
        /*isFetching: true*/
      }
    case BUY_TOKEN_REQUEST_SUCCESS:
      const traders = state.items.map(trader => {
        if (trader.id === action.id) {
          return {
            ...trader, tokens: trader.tokens - action.tokens
          }
        }
        return trader;
      })
      return {
        ...state,
        /*isFetching: false,*/
        items: traders,
        lastUpdated: action.lastUpdated
      }
    default:
      return state
  }
}

export default combineReducers({
  routing: routerReducer,
  loadingBar: loadingBarReducer,
  trader
})