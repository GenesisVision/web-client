import "shared/components/deposit-details/deposit-details.scss";
import "./attach-account-settings.scss";

import useCreateAssetValidate from "asset-validate.hook.ts";
import AssetField, {
  AssetFields
} from "components/assets/asset-fields/asset-field";
import { InjectedFormikProps, withFormik } from "formik";
import { Broker } from "gv-api-web";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import SettingsBlock from "shared/components/settings-block/settings-block";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { SetSubmittingType } from "shared/utils/types";

import attachAccountSettingsValidationSchema from "./attach-account-settings.validators";

const _AttachAccountSettings: React.FC<Props> = ({
  data: exchanges,
  handleSubmit,
  isValid,
  t,
  isSubmitting
}) => {
  const validateAndSubmit = useCreateAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("attach-account-page.settings.exchange")}
        blockNumber={"01"}
      >
        <AssetField>
          <GVFormikField
            name={ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId}
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
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page.settings.api")}
        blockNumber={"03"}
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
  brokerAccountTypeId = "brokerAccountTypeId",
  secret = "secret",
  key = "key"
}

export interface IAttachAccountSettingsFormValues {
  [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]: string;
  [ATTACH_ACCOUNT_FIELDS.secret]: string;
  [ATTACH_ACCOUNT_FIELDS.key]: string;
}

export interface ICreateFundSettingsProps extends WithTranslation, OwnProps {}

type Props = InjectedFormikProps<
  ICreateFundSettingsProps,
  IAttachAccountSettingsFormValues
>;

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
      [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]: data.length
        ? data[0].name
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

interface OwnProps {
  data: Broker[];
  onSubmit: (
    values: IAttachAccountSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
