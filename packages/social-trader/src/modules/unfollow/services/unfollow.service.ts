import { DetachFromSignalProvider } from "gv-api-web";
import signalApi from "services/api-client/signal-api";
import authService from "services/auth-service";

export const detachToSignalInternal = ({
  id,
  model
}: {
  id: string;
  model?: DetachFromSignalProvider;
}) =>
  signalApi.detachSlaveFromMasterInternal(id, authService.getAuthArg(), {
    body: model
  });

export const detachToSignalExternal = ({
  id,
  model
}: {
  id: string;
  model?: DetachFromSignalProvider;
}) =>
  signalApi.detachSlaveFromMasterExternal(id, authService.getAuthArg(), {
    body: model
  });
