import { BUY_TOKEN_REQUEST_SUCCESS } from '../actions/tradersActions'
import { INVESTOR_PROFIT_REQUEST, INVESTOR_PROFIT_REQUEST_SUCCESS } from '../actions/investorProfitActions'

const initialState = {
  isFetching: false,
  isRequested: false
};

const investorProfitReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVESTOR_PROFIT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequested: true
      }
    case INVESTOR_PROFIT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        chart: action.chart,
        trades: action.trades,
        lastUpdated: action.lastUpdated
      }
    case BUY_TOKEN_REQUEST_SUCCESS:
      const newTrade = {
        traderName: action.traderName,
        tokens: action.tokens,
        date: action.date
      };
      return {
        ...state,
        trades: [...state.trades,  newTrade ],
        lastUpdated: action.lastUpdated
      }
    default:
      return state
  }
}

export default investorProfitReducer