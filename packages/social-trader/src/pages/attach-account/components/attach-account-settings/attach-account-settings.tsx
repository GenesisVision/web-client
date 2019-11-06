import "shared/components/deposit-details/deposit-details.scss";
import "./attach-account-settings.scss";

import CreateAssetField, {
  CreateAssetFields
} from "components/create-asset/create-asset-field/create-asset-field";
import useCreateAssetValidate from "components/create-asset/create-asset-validate.hook";
import DescriptionBlock from "components/create-asset/fields/description-block";
import { InjectedFormikProps, withFormik } from "formik";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
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
  isSubmitting,
  values: { description }
}) => {
  const validateAndSubmit = useCreateAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("attach-account-page.settings.exchange")}
        blockNumber={"01"}
      >
        <CreateAssetField>
          <GVFormikField
            name={ATTACH_ACCOUNT_FIELDS.exchange}
            component={GVTextField}
            label={t("attach-account-page.settings.fields.exchange")}
            InputComponent={Select}
            disableIfSingle
          >
            {exchanges.map((exchange: any) => (
              <option value={exchange} key={exchange}>
                {exchange}
              </option>
            ))}
          </GVFormikField>
        </CreateAssetField>
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page.settings.main-settings")}
        blockNumber={"02"}
      >
        <DescriptionBlock
          titleName={ATTACH_ACCOUNT_FIELDS.title}
          descriptionName={ATTACH_ACCOUNT_FIELDS.description}
          logoName={ATTACH_ACCOUNT_FIELDS.logo}
          description={description}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("attach-account-page.settings.api")}
        blockNumber={"03"}
      >
        <CreateAssetFields>
          <CreateAssetField wide>
            <GVFormikField
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.apiKey}
              label={t("attach-account-page.settings.fields.api-key")}
              autoComplete="off"
              component={GVTextField}
            />
          </CreateAssetField>
          <CreateAssetField wide>
            <GVFormikField
              className="attach-account-settings__api-field"
              type="text"
              name={ATTACH_ACCOUNT_FIELDS.apiSecret}
              label={t("attach-account-page.settings.fields.api-secret")}
              autoComplete="off"
              component={GVTextField}
            />
          </CreateAssetField>
        </CreateAssetFields>
      </SettingsBlock>
      <CreateAssetNavigation
        asset={"attach-external-account"}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export enum ATTACH_ACCOUNT_FIELDS {
  exchange = "exchange",
  apiSecret = "apiSecret",
  apiKey = "apiKey",
  logo = "logo",
  description = "description",
  title = "title"
}

export interface IAttachAccountSettingsFormValues {
  [ATTACH_ACCOUNT_FIELDS.exchange]: string;
  [ATTACH_ACCOUNT_FIELDS.apiSecret]: string;
  [ATTACH_ACCOUNT_FIELDS.apiKey]: string;
  [ATTACH_ACCOUNT_FIELDS.logo]: IImageValue;
  [ATTACH_ACCOUNT_FIELDS.description]: string;
  [ATTACH_ACCOUNT_FIELDS.title]: string;
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
    displayName: "AttachAccountSettingsForm",
    mapPropsToValues: () => ({
      [ATTACH_ACCOUNT_FIELDS.logo]: {},
      [ATTACH_ACCOUNT_FIELDS.description]: "",
      [ATTACH_ACCOUNT_FIELDS.title]: "",
      [ATTACH_ACCOUNT_FIELDS.apiSecret]: "",
      [ATTACH_ACCOUNT_FIELDS.exchange]: "Binance",
      [ATTACH_ACCOUNT_FIELDS.apiKey]: ""
    }),
    validationSchema: attachAccountSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_AttachAccountSettings);
export default AttachAccountSettings;

interface OwnProps {
  data: any[];
  onSubmit: (
    values: IAttachAccountSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
