import httpClient from '../utils/httpClient'
import {alertMessageActions} from "../shared/alert-message/actions";

export const INVESTOR_PROFIT_REQUEST = 'INVESTOR_PROFIT_REQUEST'
export const INVESTOR_PROFIT_SUCCESS = 'INVESTOR_PROFIT_SUCCESS'
export const INVESTOR_PROFIT_FAILURE = 'INVESTOR_PROFIT_FAILURE'

const investorProfitRequest = () => ({
  type: INVESTOR_PROFIT_REQUEST
})

const investorProfitSuccess = data => ({
  type: INVESTOR_PROFIT_SUCCESS,
  chart: data.chart,
  trades: data.trades,
  receivedAt: Date.now()
})

const investorProfitFailure = (message) => ({
  type: INVESTOR_PROFIT_FAILURE,
  message,
  lastUpdated: Date.now()
})

const fetch = () => async dispatch => {
  dispatch(investorProfitRequest());
  try {
    const data = await httpClient.get('/api/investor-profit', null, true);
    dispatch(investorProfitSuccess(data));
  }
  catch (e) {
    dispatch(investorProfitFailure(e));
    dispatch(alertMessageActions.error('Internal Server Error'));
  }
}

const investorProfitActions = { fetch }
export default investorProfitActions
