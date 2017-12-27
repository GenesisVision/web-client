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
    const data = await httpClient.get('/api/traders', null, true);
    dispatch(tradersReceive(data));
  }
  catch(e){
    dispatch(tradersFailure(e));
  }
}

export const BUY_TOKEN_REQUEST = 'BUY_TOKEN_REQUEST'
export const BUY_TOKEN_REQUEST_SUCCESS = 'BUY_TOKEN_REQUEST_SUCCESS'

const buyTokensRequest = (traderId, tokens) => ({
  type: BUY_TOKEN_REQUEST,
  traderId: traderId,
  tokens: tokens
})

const buyTokensReceive = (traderId, traderName, tokens, date) => ({
  type: BUY_TOKEN_REQUEST_SUCCESS,
  traderId: traderId,
  traderName: traderName,
  tokens: tokens,
  date: date,
  lastUpdated: Date.now()
})

export const buyToken = (traderId, tokens) => dispatch => {
  dispatch(buyTokensRequest(traderId, tokens));
  return new Promise((resolve, reject) => {
    const promiseTimeout = setTimeout(() => {
      clearTimeout(promiseTimeout); 
      resolve({ traderId, traderName: `${traderId}Name`, tokens, date: new Date() });
    }, 1000);
  })
    .then(data => {
      dispatch(buyTokensReceive(data.traderId, data.traderName, data.tokens, data.date));
    })
}
