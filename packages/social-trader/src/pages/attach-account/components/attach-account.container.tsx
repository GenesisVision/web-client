import { Push } from "components/link/link";
import { Broker } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import {
  attachAccount,
  fetchExchanges
} from "pages/attach-account/services/attach-account.service";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { SetSubmittingType } from "utils/types";

import AttachAccountSettings, {
  IAttachAccountSettingsFormValues
} from "./attach-account-settings/attach-account-settings";

const _AttachAccountPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  const pushMiddleware = () => Push(TRADING_ROUTE);
  const { sendRequest: attach } = useApiRequest({
    middleware: [pushMiddleware],
    request: attachAccount
  });
  const { data: exchanges } = useApiRequest<Broker[]>({
    fetchOnMount: true,
    request: fetchExchanges
  });

  const handleSubmit = useCallback(
    (
      values: IAttachAccountSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => attach(values, setSubmitting),
    []
  );
  return (
    <>
      <div className="create-asset__header">
        <h1>{t("attach-account-page.title")}</h1>
      </div>
      <div className="create-asset__content">
        <AttachAccountSettings
          onSubmit={handleSubmit}
          data={exchanges!}
          loaderData={[]}
        />
      </div>
    </>
  );
};

interface Props {}

const AttachAccountContainer = React.memo(_AttachAccountPage);
export default AttachAccountContainer;
