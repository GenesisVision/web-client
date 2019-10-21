import { push } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { RootState } from "shared/reducers/root-reducer";
import {
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_ROUTE
} from "shared/routes/programs.routes";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import {
  ManagerThunk,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

export const cancelChangeBrokerMethod = (
  programId: string
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .cancelChangeBroker(authService.getAuthArg(), {
      programId
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number,
  setSubmitting: SetSubmittingType
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .changeBroker(authService.getAuthArg(), {
      request: { programId, newBrokerAccountTypeId, newLeverage }
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
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
