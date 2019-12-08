import "components/deposit-details/deposit-details.scss";
import "./attach-account-settings.scss";

import AssetField, {
  AssetFields
} from "components/assets/asset-fields/asset-field";
import useAssetValidate from "components/assets/asset-validate.hook";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select, { ISelectChangeEvent } from "components/select/select";
import SettingsBlock from "components/settings-block/settings-block";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { InjectedFormikProps, withFormik } from "formik";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

import attachAccountSettingsValidationSchema from "./attach-account-settings.validators";

const _AttachAccountSettings: React.FC<Props> = ({
  setFieldValue,
  data: exchanges,
  handleSubmit,
  isValid,
  t,
  isSubmitting
}) => {
  const [broker, setBroker] = useState<Broker>(exchanges[0]);
  const validateAndSubmit = useAssetValidate({ handleSubmit, isValid });
  const brokerNameChangeHandle = useCallback(
    ({ target: { value } }: ISelectChangeEvent) => {
      const broker = exchanges.find(({ name }) => name === value)!;
      setBroker(broker);
      setFieldValue(ATTACH_ACCOUNT_FIELDS.brokerName, value);
    },
    []
  );
  useEffect(() => {
    setBroker(exchanges[0]);
  }, [exchanges]);
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("attach-account-page.settings.exchange")}
        blockNumber={"01"}
      >
        <AssetFields>
          <AssetField>
            <GVFormikField
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
            </GVFormikField>
          </AssetField>
          <AssetField>
            {broker && (
              <GVFormikField
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
              </GVFormikField>
            )}
          </AssetField>
        </AssetFields>
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page.settings.api")}
        blockNumber={"02"}
      >
        <AssetFields>
          <AssetField wide>
            <GVFormikField
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.key}
              label={t("attach-account-page.settings.fields.api-key")}
              autoComplete="off"
              component={GVTextField}
            />
          </AssetField>
          <AssetField wide>
            <GVFormikField
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.secret}
              label={t("attach-account-page.settings.fields.api-secret")}
              autoComplete="off"
              component={GVTextField}
            />
          </AssetField>
        </AssetFields>
      </SettingsBlock>
      <CreateAssetNavigation
        asset={"attach-external-account"}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

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

export interface ICreateFundSettingsProps extends WithTranslation, OwnProps {}

type Props = InjectedFormikProps<
  ICreateFundSettingsProps,
  IAttachAccountSettingsFormValues
>;

interface OwnProps {
  data: Broker[];
  onSubmit: (
    values: IAttachAccountSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const AttachAccountSettings = compose<
  React.ComponentType<OwnProps & WithBlurLoaderProps<any[]>>
>(
  withBlurLoader,
  translate(),
  withFormik<ICreateFundSettingsProps, IAttachAccountSettingsFormValues>({
    enableReinitialize: true,
    displayName: "AttachAccountSettingsForm",
    mapPropsToValues: ({ data }) => ({
      [ATTACH_ACCOUNT_FIELDS.secret]: "",
      [ATTACH_ACCOUNT_FIELDS.brokerName]: data.length ? data[0].name : "",
      [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]: data.length
        ? data[0].accountTypes[0].id
        : "",
      [ATTACH_ACCOUNT_FIELDS.key]: ""
    }),
    validationSchema: attachAccountSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_AttachAccountSettings);
export default AttachAccountSettings;
