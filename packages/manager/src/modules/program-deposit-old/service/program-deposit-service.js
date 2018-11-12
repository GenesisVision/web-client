import filesService from "shared/services/file-service";
import programDepositActions from "../actions/program-deposit-actions";

const fetchProgramDeposit = programId => dispatch => {
  return dispatch(
    programDepositActions.fetchProgramDeposit(
      programId,
      filesService.addLogoSrc("logo")
    )
  );
};

export default { fetchProgramDeposit };
