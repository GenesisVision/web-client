import * as actions from "../actions/program-details-actions";

class ProgramDetailsService {
  getProgramDetails = () => (dispatch, getState) => {
    dispatch(actions.fetchProgramDetails());
  };
}

const programDetailsService = new ProgramDetailsService();

export default programDetailsService;
