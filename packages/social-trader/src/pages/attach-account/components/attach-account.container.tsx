import { Broker } from "gv-api-web";
import {
  attachAccount,
  fetchExchanges
} from "pages/attach-account/services/attach-account.service";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Push } from "shared/components/link/link";
import useApiRequest from "shared/hooks/api-request.hook";
import { TRADING_ROUTE } from "shared/routes/dashboard.routes";
import { SetSubmittingType } from "shared/utils/types";

import AttachAccountSettings, {
  IAttachAccountSettingsFormValues
} from "./attach-account-settings/attach-account-settings";

const _AttachAccountPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { sendRequest: attach } = useApiRequest({
    request: attachAccount
  });
  const { sendRequest: getExchanges, data: exchanges } = useApiRequest<
    Broker[]
  >({
    request: fetchExchanges
  });
  useEffect(() => {
    getExchanges();
  }, []);
  const handleSubmit = useCallback(
    (
      values: IAttachAccountSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => attach(values, setSubmitting).then(() => Push(TRADING_ROUTE)),
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
