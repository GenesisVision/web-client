export const BUY_TOKEN_REQUEST = 'BUY_TOKEN_REQUEST'
export const BUY_TOKEN_SUCCESS = 'BUY_TOKEN_SUCCESS'

const buyTokensRequest = (traderId, tokens) => ({
  type: BUY_TOKEN_REQUEST,
  traderId: traderId,
  tokens: tokens
})

const buyTokensReceive = (traderId, traderName, tokens, date) => ({
  type: BUY_TOKEN_SUCCESS,
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