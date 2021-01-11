import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { ExchangeCredentials } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isTwoFactorEnabledSelector } from "reducers/header-reducer";

import { addApiKey } from "../../services/api-keys.service";
import { ApiKeyForm } from "../form/api-key.form";
import { IApiKeyFormValues } from "../form/api-key.helpers";
import { AddApiKeyCredentials } from "./add-api-key-credentials";

export interface IAddApiKeyContainerProps {
  id: string;
}

const _AddApiKeyContainer: React.FC<IAddApiKeyContainerProps> = ({ id }) => {
  const [t] = useTranslation();

  const isTwoFactorEnabled = useSelector(isTwoFactorEnabledSelector);

  const { sendRequest, data } = useApiRequest<ExchangeCredentials>({
    request: addApiKey
  });

  const handleSubmit = useCallback(
    (values: IApiKeyFormValues) => {
      return sendRequest({
        ...values,
        id
      });
    },
    [id]
  );

  return (
    <>
      <DialogTop title={t("api-keys:key-dialog.add-title")} />
      <DialogBottom fixed={false}>
        {!data && (
          <ApiKeyForm
            showTitle
            isTwoFactorEnabled={isTwoFactorEnabled}
            onSubmit={handleSubmit}
            submitLabel={t("api-keys:key-dialog.create")}
          />
        )}
        {data && <AddApiKeyCredentials data={data} />}
      </DialogBottom>
    </>
  );
};

export const AddApiKeyContainer = React.memo(_AddApiKeyContainer);
