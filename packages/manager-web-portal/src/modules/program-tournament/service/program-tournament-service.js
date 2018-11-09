import filesService from "../../../shared/services/file-service";
import history from "../../../utils/history";
import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import { createTournamentProgram } from "../actions/program-tournament-actions";
import { HOME_ROUTE } from "../../../components/app.constants";

export const createProgram = programData => dispatch => {
  const data = {
    ...programData
  };

  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFile(data.logo.cropped);
  }

  return promise
    .then(logo => {
      const data = {
        ...programData,
        logo
      };
      return dispatch(createTournamentProgram(data));
    })
    .then(response => {
      history.push(HOME_ROUTE);
      return response;
    })
    .then(response =>
      dispatch(alertMessageActions.success("Program was created successfully"))
    );
};
