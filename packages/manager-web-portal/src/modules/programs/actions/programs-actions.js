import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import * as actionTypes from "./programs-actions.constants";

const fetchPrograms = (
  filters,
  onResolve = response => Promise.resolve(response)
) => ({
  type: actionTypes.PROGRAMS,
  payload: SwaggerManagerApi.apiManagerInvestmentProgramsPost(filters).then(
    onResolve
  )
});

const programsActions = {
  fetchPrograms
};
export default programsActions;
