import httpClient from "../utils/httpClient"

export const TRADERS_REQUEST = 'TRADERS_REQUEST'
export const TRADERS_REQUEST_SUCCESS = 'TRADERS_REQUEST_SUCCESS'
export const TRADERS_REQUEST_FAILURE = 'TRADERS_REQUEST_FAILURE'

const tradersRequest = () => ({
  type: TRADERS_REQUEST
})

const tradersReceive = (items) => ({
  type: TRADERS_REQUEST_SUCCESS,
  items,
  lastUpdated: Date.now()
})

const tradersFailure = (message) => ({
  type: TRADERS_REQUEST_FAILURE,
  message,
  lastUpdated: Date.now()
})

export const fetchTraders = () => async dispatch => {
  dispatch(tradersRequest());
  try{
    const data = await httpClient.get('/api/traders', null);
    dispatch(tradersReceive(data));
  }
  catch(e){
    dispatch(tradersFailure(e));
  }
}
