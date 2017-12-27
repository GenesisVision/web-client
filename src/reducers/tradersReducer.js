import {
  BUY_TOKEN_REQUEST,
  BUY_TOKEN_REQUEST_SUCCESS,
  TRADERS_REQUEST,
  TRADERS_REQUEST_SUCCESS,
  TRADERS_REQUEST_FAILURE
} from '../actions/tradersActions'

const initialState = {
  isRequested: false,
  isFetching: false,
  items: []
};

const tradersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRADERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequested: true
      }
    case TRADERS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
        lastUpdated: action.lastUpdated
      }
    case TRADERS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.message,
        lastUpdated: action.lastUpdated
      }
    case BUY_TOKEN_REQUEST:
      return state;
    case BUY_TOKEN_REQUEST_SUCCESS:
      const traders = state.items.map(trader => {
        if (trader.id === action.traderId) {
          return {
            ...trader,
            tokens: trader.tokens - action.tokens,
            trades: trader.trades + 1
          }
        }
        return trader;
      })
      return {
        ...state,
        items: traders,
        lastUpdated: action.lastUpdated
      }
    default:
      return state
  }
}

export default tradersReducer