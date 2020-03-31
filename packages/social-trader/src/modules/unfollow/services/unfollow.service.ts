import { DetachFromSignalProvider } from "gv-api-web";
import { api, Token } from "services/api-client/swagger-custom-client";

export const detachToSignalInternal = ({
  id,
  model
}: {
  id: string;
  model?: DetachFromSignalProvider;
}) =>
  api.signal().detachSlaveFromMasterInternal(id, {
    body: model
  });

export const detachToSignalExternal = ({
  id,
  model
}: {
  id: string;
  model?: DetachFromSignalProvider;
}) =>
  api.signal().detachSlaveFromMasterExternal(id, {
    body: model
  });
