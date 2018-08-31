import * as actions from "../actions/program-details-actions";

export const getProgramDetails = () => (dispatch, getState) => {
  dispatch(actions.fetchProgramDetails());
};
