import httpClient from '../utils/httpClient'
import { alertMessageActions } from '../actions/alertMessageActions/alertMessageActions'

export const TRADER_REQUEST = 'TRADER_REQUEST'
export const TRADER_REQUEST_SUCCESS = 'TRADER_REQUEST_SUCCESS'
export const TRADER_REQUEST_FAILURE = 'TRADER_REQUEST_FAILURE'

const traderRequest = () => ({
  type: TRADER_REQUEST
})

const traderReceive = (trader) => ({
  type: TRADER_REQUEST_SUCCESS,
  trader,
  lastUpdated: Date.now()
})

const traderFailure = (message) => ({
  type: TRADER_REQUEST_FAILURE,
  message,
  lastUpdated: Date.now()
})

const fetch = (id) => async dispatch => {
  dispatch(traderRequest());
  try {
    const data = await httpClient.get(`/api/traders/${id}`, null);
    dispatch(traderReceive(data));
  }
  catch (e) {
    dispatch(traderFailure(e));
    dispatch(alertMessageActions.error('Internal Server Error'));
  }
}

const traderActions = { fetch }
export default traderActions
