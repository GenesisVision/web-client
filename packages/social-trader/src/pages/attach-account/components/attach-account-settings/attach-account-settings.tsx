import AssetField, {
  AssetFields
} from "components/assets/asset-fields/asset-field";
import useAssetValidate from "components/assets/asset-validate.hook";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import { Row } from "components/row/row";
import Select, { ISelectChangeEvent } from "components/select/select";
import SettingsBlock from "components/settings-block/settings-block";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import withLoader from "decorators/with-loader";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import "./attach-account-settings.scss";
import {
  attachAccountSettingsMapPropsToValues,
  attachAccountSettingsValidationSchema
} from "./attach-account-settings.validators";

export enum ATTACH_ACCOUNT_FIELDS {
  brokerName = "brokerName",
  brokerAccountTypeId = "brokerAccountTypeId",
  secret = "secret",
  key = "key"
}

const _AttachAccountSettings: React.FC<Props> = ({
  success,
  isPending,
  data: exchanges,
  onSubmit,
  requestBrokerName
}) => {
  const [t] = useTranslation();

  const form = useForm<IAttachAccountSettingsFormValues>({
    defaultValues: attachAccountSettingsMapPropsToValues({
      exchanges,
      requestBrokerName
    }),
    validationSchema: attachAccountSettingsValidationSchema(t),
    mode: "onChange"
  });
  const {
    setValue,
    formState: { isValid }
  } = form;

  const isSuccessful = success;

  const [broker, setBroker] = useState<Broker>(exchanges[0]);
  const validateAndSubmit = useAssetValidate({
    handleSubmit: onSubmit,
    isValid
  });
  const brokerNameChangeHandle = useCallback(
    ({ target: { value } }: ISelectChangeEvent) => {
      const broker = safeGetElemFromArray(
        exchanges,
        ({ name }) => name === value
      );
      setBroker(broker);
      setValue(ATTACH_ACCOUNT_FIELDS.brokerName, value, true);
    },
    [setValue]
  );
  useEffect(() => {
    setBroker(exchanges[0]);
  }, [exchanges]);
  return (
    <HookForm form={form} onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("attach-account-page.settings.exchange")}
        blockNumber={"01"}
      >
        <AssetFields>
          <AssetField>
            <GVHookFormField
              wide
              onChange={brokerNameChangeHandle}
              name={ATTACH_ACCOUNT_FIELDS.brokerName}
              component={GVTextField}
              label={t("attach-account-page.settings.fields.exchange")}
              InputComponent={Select}
              disableIfSingle
            >
              {exchanges.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </GVHookFormField>
          </AssetField>
          <AssetField hide={!broker || broker.accountTypes.length < 2}>
            <GVHookFormField
              wide
              name={ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId}
              component={GVTextField}
              label={t("attach-account-page.settings.fields.account-type")}
              InputComponent={Select}
              disableIfSingle
            >
              {broker.accountTypes.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </GVHookFormField>
          </AssetField>
        </AssetFields>
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page.settings.api")}
        blockNumber={"02"}
      >
        <AssetFields>
          <AssetField wide>
            <GVHookFormField
              showCorrect
              wide
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.key}
              label={t("attach-account-page.settings.fields.api-key")}
              autoComplete="off"
              component={SimpleTextField}
            />
          </AssetField>
          <AssetField wide>
            <GVHookFormField
              showCorrect
              wide
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.secret}
              label={t("attach-account-page.settings.fields.api-secret")}
              autoComplete="off"
              component={SimpleTextField}
            />
          </AssetField>
        </AssetFields>
      </SettingsBlock>
      <Row large>
        <CreateAssetNavigation
          asset={"attach-external-account"}
          isSuccessful={isSuccessful}
          isSubmitting={isPending}
        />
      </Row>
    </HookForm>
  );
};

export interface IAttachAccountSettingsFormValues {
  [ATTACH_ACCOUNT_FIELDS.brokerName]: string;
  [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]: string;
  [ATTACH_ACCOUNT_FIELDS.secret]: string;
  [ATTACH_ACCOUNT_FIELDS.key]: string;
}

interface Props {
  isPending?: boolean;
  success?: boolean;
  errorMessage?: string;
  requestBrokerName?: string;
  data: Broker[];
  onSubmit: (values: IAttachAccountSettingsFormValues) => void;
}

const AttachAccountSettings = withLoader(React.memo(_AttachAccountSettings));
export default AttachAccountSettings;
