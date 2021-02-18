import useAssetValidate from "components/assets/asset-validate.hook";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import { Center } from "components/center/center";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
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

import styles from "./attach-account-settings.module.scss";
import { attachAccountSettingsMapPropsToValues } from "./attach-account-settings.validators";

export enum ATTACH_ACCOUNT_FIELDS {
  brokerName = "brokerName",
  brokerAccountTypeId = "brokerAccountTypeId",
  secret = "secret",
  key = "key"
}

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
        label={t("attach-account-page:settings.exchange")}
        blockNumber={"01"}
      >
        <Center>
          <RowItem>
            <GVHookFormField
              wide
              onChange={brokerNameChangeHandle}
              name={ATTACH_ACCOUNT_FIELDS.brokerName}
              component={GVTextField}
              label={t("asset-settings:fields.exchange")}
              InputComponent={Select}
              disableIfSingle
            >
              {exchanges.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </GVHookFormField>
          </RowItem>
          <RowItem hide={!broker || broker.accountTypes.length < 2}>
            <GVHookFormField
              wide
              name={ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId}
              component={GVTextField}
              label={t("asset-settings:fields.account-type")}
              InputComponent={Select}
              disableIfSingle
            >
              {broker.accountTypes.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </GVHookFormField>
          </RowItem>
        </Center>
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page:settings.api")}
        blockNumber={"02"}
      >
        <Row wide>
          <GVHookFormField
            showCorrect
            className={styles["attach-account-settings__api-field"]}
            type="text"
            name={ATTACH_ACCOUNT_FIELDS.key}
            label={t("asset-settings:fields.api-key")}
            autoComplete="off"
            component={SimpleTextField}
            rules={{
              required: t("validations.api-key")
            }}
          />
        </Row>
        <Row wide>
          <GVHookFormField
            showCorrect
            className={styles["attach-account-settings__api-field"]}
            type="text"
            name={ATTACH_ACCOUNT_FIELDS.secret}
            label={t("asset-settings:fields.api-secret")}
            autoComplete="off"
            component={SimpleTextField}
            rules={{
              required: t("validations.api-secret")
            }}
          />
        </Row>
      </SettingsBlock>
      <Row size={"large"}>
        <CreateAssetNavigation
          asset={"attach-external-account"}
          isSuccessful={isSuccessful}
          isSubmitting={isPending}
        />
      </Row>
    </HookForm>
  );
};

const AttachAccountSettings = withLoader(React.memo(_AttachAccountSettings));
export default AttachAccountSettings;
