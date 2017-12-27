import httpClient from "../utils/httpClient";

export const INVESTOR_PROFIT_REQUEST = 'INVESTOR_PROFIT_REQUEST'
export const INVESTOR_PROFIT_REQUEST_SUCCESS = 'INVESTOR_PROFIT_REQUEST_SUCCESS'
export const INVESTOR_PROFIT_REQUEST_FAILURE = 'INVESTOR_PROFIT_REQUEST_FAILURE'

const investorProfitRequest = () => ({
  type: INVESTOR_PROFIT_REQUEST
})

const investorProfitReceive = data => ({
  type: INVESTOR_PROFIT_REQUEST_SUCCESS,
  chart: data.chart,
  trades: data.trades,
  receivedAt: Date.now()
})

const investorProfitFailure = (message) => ({
  type: INVESTOR_PROFIT_REQUEST_FAILURE,
  message,
  lastUpdated: Date.now()
})

export const fetchInvestorProfit = () => async dispatch => {
  dispatch(investorProfitRequest());
  try{
    const data = await httpClient.get('/api/investor-profit', null, true);
    dispatch(investorProfitReceive(data));
  }
  catch(e){
    dispatch(investorProfitFailure(e));
  }
}
