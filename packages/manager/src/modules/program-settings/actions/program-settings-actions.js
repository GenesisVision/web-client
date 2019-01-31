import SwaggerManagerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import * as actionTypes from "./program-settings-actions.constants";

const fetchProgramForm = () => {
  return {
    type: actionTypes.PROGRAM_SETTINGS_FETCH_FORM,
    payload: SwaggerManagerApi.apiManagerBrokersPost()
  };
};

const fetchProgramSettings = (programId, onResolve = data => data) => {
  let data = {
    authorization: authService.getAuthArg()
  };

  return {
    type: actionTypes.PROGRAM_SETTINGS,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramGet(programId, data)
      .then(onResolve)
      .then(response => response.investmentProgram)
  };
};

const createProgram = programData => {
  const data = {
    request: programData
  };
  return {
    type: actionTypes.PROGRAM_SETTINGS_CREATE_FORM,
    payload: SwaggerManagerApi.apiManagerAccountNewInvestmentRequestPost(
      authService.getAuthArg(),
      data
    )
  };
};

const editProgram = programData => {
  const data = {
    model: programData
  };
  return {
    type: actionTypes.PROGRAM_SETTINGS_EDIT_FORM,
    payload: SwaggerManagerApi.apiManagerInvestmentProgramUpdatePost(
      authService.getAuthArg(),
      data
    )
  };
};

const programSettingsActions = {
  fetchProgramForm,
  fetchProgramSettings,
  createProgram,
  editProgram
};
export default programSettingsActions;
