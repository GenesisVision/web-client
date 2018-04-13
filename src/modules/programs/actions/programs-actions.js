import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./programs-actions.constants";

const fetchPrograms = filters => {
  return {
    type: actionTypes.PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost(filters).then(
      response => {
        response.investmentPrograms.forEach(x => {
          x.logo = filesService.getFileUrl(x.logo);
        });

        return response;
      }
    )
  };
};

const programsActions = {
  fetchPrograms
};
export default programsActions;
