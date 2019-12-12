import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import Router from "next/router";
import { GV_FOLLOW_ROUTE } from "routes/invest.routes";
//import managerApi from "shared/services/api-client/manager-api";
import authService from "services/auth-service";
import { ManagerThunk, ResponseError, SetSubmittingType } from "utils/types";

export const cancelChangeBrokerMethod = (
  programId: string
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  new CancelablePromise<void>(() => {});
// managerApi
//   .cancelChangeBroker(authService.getAuthArg(), {
//     programId
//   })
//   .then(() => {
//     dispatch(
//       alertMessageActions.success(
//         "follow-settings.notifications.broker-success",
//         true
//       )
//     );
//   })
//   .catch((error: ResponseError) => {
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number,
  setSubmitting: SetSubmittingType
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  new CancelablePromise<void>(() => {});
// managerApi
//   .changeBroker(authService.getAuthArg(), {
//     request: { programId, newBrokerAccountTypeId, newLeverage }
//   })
//   .then(() => {
//     dispatch(
//       alertMessageActions.success(
//         "follow-settings.notifications.broker-success",
//         true
//       )
//     );
//   })
//   .catch((error: ResponseError) => {
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export const redirectToFollow = (id: string) => {
  Router.replace(`${GV_FOLLOW_ROUTE}/${id}`);
};
