import { AttachToSignalProvider, CancelablePromise } from "gv-api-web";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

export const getSignalInfo = (id: string): CancelablePromise<number> =>
  signalApi
    .getSlaveAttachInfo(id, authService.getAuthArg())
    .then(({ minDeposit }) => minDeposit);

export const attachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.attachSlaveToMaster(id, authService.getAuthArg(), {
    model: requestParams
  });

export const updateAttachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.updateSubscriptionSettings(id, authService.getAuthArg(), {
    model: requestParams
  });

export type TAttachToSignal = (
  id: string,
  requestParams: AttachToSignalProvider
) => CancelablePromise<any>;
