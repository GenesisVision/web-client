import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import authService from "../../../services/auth-service";
import * as actionTypes from "./program-close-period-actions.constants";

const programClosePeriod = programId => {
  return {
    type: actionTypes.PROGRAM_CLOSE_PERIOD,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramPeriodClosePost(
      programId,
      authService.getAuthArg()
    )
  };
};

const programClosePeriodActions = {
  programClosePeriod
};
export default programClosePeriodActions;
