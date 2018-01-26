import httpClient from '../utils/httpClient'
import {alertMessageActions} from "../shared/alert-message/actions";

export const TRADERS_REQUEST = 'TRADERS_REQUEST'
export const TRADERS_REQUEST_SUCCESS = 'TRADERS_REQUEST_SUCCESS'
export const TRADERS_REQUEST_FAILURE = 'TRADERS_REQUEST_FAILURE'

const tradersRequest = () => ({
  type: TRADERS_REQUEST
})

const tradersReceive = (traders) => ({
  type: TRADERS_REQUEST_SUCCESS,
  traders,
  lastUpdated: Date.now()
})

const tradersFailure = (message) => ({
  type: TRADERS_REQUEST_FAILURE,
  message,
  lastUpdated: Date.now()
})

const fetch = () => async dispatch => {
  dispatch(tradersRequest());
  try {
    const data = await httpClient.get('/api/traders', null);
    dispatch(tradersReceive(data));
  }
  catch (e) {
    dispatch(tradersFailure(e));
    dispatch(alertMessageActions.error('Internal Server Error'));
  }
}

const tradersActions = { fetch }
export default tradersActions
