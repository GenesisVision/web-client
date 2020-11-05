import { Push } from "components/link/link";
import { Broker } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import {
  attachAccount,
  fetchExchanges
} from "pages/attach-account/services/attach-account.service";
import React, { useCallback } from "react";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { sendEventToGA } from "utils/ga";

import AttachAccountSettings, {
  IAttachAccountSettingsFormValues
} from "./attach-account-settings/attach-account-settings";

const _AttachAccountPage: React.FC<Props> = ({ requestBrokerName }) => {
  const [success, setSuccess] = useIsOpen();
  const pushMiddleware = () => {
    Push(TRADING_ROUTE);
  };
  const successMiddleware = () => {
    setSuccess();
  };
  const sendEventMiddleware = () => {
    sendEventToGA({
      eventCategory: "Create",
      eventAction: "AttachExternalAccount"
    });
  };
  const { sendRequest: attach, errorMessage, isPending } = useApiRequest({
    middleware: [successMiddleware, sendEventMiddleware, pushMiddleware],
    request: attachAccount
  });
  const { data: exchanges } = useApiRequest<Broker[]>({
    name: "fetchExchanges",
    cache: true,
    fetchOnMount: true,
    request: fetchExchanges
  });

  const handleSubmit = useCallback(
    (values: IAttachAccountSettingsFormValues) => attach(values),
    []
  );
  return (
    <AttachAccountSettings
      isPending={isPending}
      success={success}
      errorMessage={errorMessage}
      requestBrokerName={requestBrokerName}
      onSubmit={handleSubmit}
      data={exchanges!}
      condition={!!exchanges}
    />
  );
};

interface Props {
  requestBrokerName?: string;
}

const AttachAccountContainer = React.memo(_AttachAccountPage);
export default AttachAccountContainer;
