import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import authService from "../../../services/auth-service";
import * as actionTypes from "./program-close-actions.constants";

const programClose = programId => {
  return {
    type: actionTypes.PROGRAM_CLOSE,
    payload: SwaggerManagerApi.apiManagerInvestmentClosePost(
      programId,
      authService.getAuthArg()
    )
  };
};

const programCloseActions = {
  programClose
};
export default programCloseActions;
