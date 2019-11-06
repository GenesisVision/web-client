import {
  attachAccount,
  fetchExchanges
} from "pages/attach-account/services/attach-account.service";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useApiRequest from "shared/hooks/api-request.hook";

import AttachAccountSettings from "./attach-account-settings/attach-account-settings";

const _AttachAccountPage: React.FC<Props> = ({}) => {
  const [t] = useTranslation();
  const { sendRequest: attach } = useApiRequest({ request: attachAccount });
  const { sendRequest: getExchanges, data: exchanges } = useApiRequest({
    request: fetchExchanges
  });
  useEffect(() => {
    getExchanges();
  }, []);
  return (
    <>
      <div className="create-asset__header">
        <h1>{t("attach-account-page.title")}</h1>
      </div>
      <div className="create-asset__content">
        <AttachAccountSettings
          onSubmit={attach}
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
