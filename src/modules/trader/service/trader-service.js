import traderActions from "../actions/trader-actions";

const updateAfterInvestment = traderId => dispatch => {
  return Promise.all([
    dispatch(traderActions.fetchTrader(traderId)),
    dispatch(traderActions.fetchTraderRequests(traderId))
  ]);
};

const traderService = { updateAfterInvestment };
export default traderService;
