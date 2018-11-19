import moment from "moment";

import { HOME_ROUTE } from "shared/components/app.constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import filesService from "shared/services/file-service";
import history from "shared/utils/history";
import replaceParams from "shared/utils/replace-params";
import { PROGRAM_ROUTE } from "pages/programs/programs.routes";
import programSettingsActions from "../actions/program-settings-actions";

const fetchProgramSettings = programId => dispatch => {
  return dispatch(
    programSettingsActions.fetchProgramSettings(
      programId,
      filesService.addLogoSrc("investmentProgram")
    )
  );
};

const createProgram = programData => dispatch => {
  const data = {
    ...programData
  };
  if (data.dateTo) {
    data.dateTo = moment(data.dateTo)
      .set({
        second: 0,
        millisecond: 0
      })
      .toISOString();
  }

  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFile(data.logo.cropped);
  }

  return promise
    .then(response => {
      const data = {
        ...programData,
        logo: response
      };
      return dispatch(programSettingsActions.createProgram(data));
    })
    .then(response => {
      history.push(HOME_ROUTE);
      return response;
    })
    .then(response =>
      dispatch(alertMessageActions.success("Program was created successfully"))
    );
};

const editProgram = (programId, programData) => dispatch => {
  let promise = Promise.resolve(programData.logoId);
  if (programData.logo.cropped) {
    promise = filesService.uploadFile(programData.logo.cropped);
  }

  return promise
    .then(response => {
      const data = {
        id: programId,
        ...programData,
        logo: response
      };
      return dispatch(programSettingsActions.editProgram(data));
    })
    .then(response => {
      history.push(
        replaceParams(PROGRAM_ROUTE, {
          ":programId": programId
        })
      );
      return response;
    })
    .then(response =>
      dispatch(alertMessageActions.success("Program was updated successfully"))
    );
};

const programSettingsService = {
  createProgram,
  editProgram,
  fetchProgramSettings
};
export default programSettingsService;
