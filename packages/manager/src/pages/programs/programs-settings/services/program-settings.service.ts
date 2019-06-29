import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import {
  ManagerThunk,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { RootState } from "shared/reducers/root-reducer";
import getParams from "shared/utils/get-params";
import {
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_ROUTE
} from "shared/routes/programs.routes";

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number,
  setSubmitting: SetSubmittingType
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .v10ManagerProgramsBrokerChangePost(authService.getAuthArg(), {
      request: { programId, newBrokerAccountTypeId, newLeverage }
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
      setSubmitting(false);
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
      setSubmitting(false);
    });

export const redirectToProgram = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { router } = getState();
  const programSlugUrl = getParams(
    router.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];
  dispatch(push(`${PROGRAMS_ROUTE}/${programSlugUrl}`));
};
