import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import Router from "next/router";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "services/auth-service";
import { ManagerThunk, ResponseError, SetSubmittingType } from "utils/types";

export const cancelChangeBrokerMethod = (programId: string): Promise<void> =>
  new CancelablePromise<void>(() => {});
// managerApi
//   .cancelChangeBroker(authService.getAuthArg(), {
//     programId
//   })
//   .then(() => {
//     dispatch(
//       alertMessageActions.success(
//         "program-settings.notifications.broker-success",
//         true
//       )
//     );
//   })
//   .catch((error: ResponseError) => {
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export const changeBrokerMethod = (props: {
  programId: string;
  newBrokerAccountTypeId: string;
  newLeverage: number;
}): Promise<void> => new CancelablePromise<void>(() => {});
// managerApi
//   .changeBroker(authService.getAuthArg(), {
//     request: { programId, newBrokerAccountTypeId, newLeverage }
//   })

export const redirectToProgram = (id: string) => {
  Router.replace(`${PROGRAMS_ROUTE}/${id}`);
};
