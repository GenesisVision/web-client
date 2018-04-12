import traderActions from "../actions/trader-actions";

const updateAfterInvestment = programId => dispatch => {
  return Promise.all([
    dispatch(traderActions.fetchTrader(programId)),
    dispatch(traderActions.fetchTraderRequests(programId))
  ]);
};

const traderService = { updateAfterInvestment };
export default traderService;
