import {
  TRADER_REQUEST,
  TRADER_REQUEST_SUCCESS,
  TRADER_REQUEST_FAILURE
} from '../actions/traderActions'

const initialState = {
  isRequested: false,
  isFetching: false
};

const traderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRADER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRequested: true
      }
    case TRADER_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        trader: action.trader,
        lastUpdated: action.lastUpdated
      }
    case TRADER_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.message,
        lastUpdated: action.lastUpdated
      }      
    default:
      return state
  }
}

export default traderReducer
