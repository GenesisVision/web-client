import fileService from "shared/services/file-service";
import history from "shared/utils/history";
import replaceParams from "shared/utils/replace-params";
import { composeApiFiltering } from "../../filtering/helpers/filtering-helpers";
import { PROGRAM_SETTINGS_EDIT_ROUTE } from "../../program-settings/program-settings.constants";
import dashboardActions from "../actions/dashboard-actions";

const fetchDashboardPrograms = () => (dispatch, getState) => {
  const { filtering } = getState().dashboardData.programs;
  let filter = { ...composeApiFiltering(filtering) };
  return dispatch(
    dashboardActions.fetchDashboardPrograms(
      filter,
      fileService.addLogoSrc("investmentPrograms")
    )
  );
};

const updateFiltering = filter => dispatch => {
  dispatch(dashboardActions.updateFiltering(filter));
  dispatch(fetchDashboardPrograms());
};

const openEditProgramPage = programId => {
  history.push(
    replaceParams(PROGRAM_SETTINGS_EDIT_ROUTE, {
      ":programId": programId
    })
  );
};

const dashboardService = {
  openEditProgramPage,
  fetchDashboardPrograms,
  updateFiltering
};
export default dashboardService;
