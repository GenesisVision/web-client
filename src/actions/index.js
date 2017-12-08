export const TRADERS_REQUEST = 'TRADERS_REQUEST'
export const TRADERS_REQUEST_SUCCESS = 'TRADERS_REQUEST_SUCCESS'

const tradersRequest = () => ({
  type: TRADERS_REQUEST
})

const tradersReceive = (items) => ({
  type: TRADERS_REQUEST_SUCCESS,
  items: items,
  receivedAt: Date.now()
})

export const fetchTraders = () => dispatch => {
  dispatch(tradersRequest());
  const data = require('../data/traders-seed').default;
  return new Promise((resolve, reject) => {
    const promiseTimeout = setTimeout(() => {
      clearTimeout(promiseTimeout); resolve(data)
    }, 1000);
  })
    .then(data => dispatch(tradersReceive(data)))
}

export const BUY_TOKEN_REQUEST = 'BUY_TOKEN_REQUEST'
export const BUY_TOKEN_REQUEST_SUCCESS = 'BUY_TOKEN_REQUEST_SUCCESS'

const buyTokensRequest = (id, tokens) => ({
  type: BUY_TOKEN_REQUEST,
  id: id,
  tokens: tokens
})

const buyTokensReceive = (id, tokens) => ({
  type: BUY_TOKEN_REQUEST_SUCCESS,
  id: id,
  tokens: tokens,
  receivedAt: Date.now()
})

export const buyToken = (id, tokens) => dispatch => {
  dispatch(buyTokensRequest(id, tokens));
  return new Promise((resolve, reject) => {
    const promiseTimeout = setTimeout(() => {
      clearTimeout(promiseTimeout); resolve({ id, tokens })
    }, 1000);
  })
    .then(data => {
      dispatch(buyTokensReceive(data.id, data.tokens))
    })
}

