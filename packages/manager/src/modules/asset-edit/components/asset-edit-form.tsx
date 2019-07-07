import { FormikProps, withFormik } from "formik";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ProgramDefaultImage from "shared/media/program-default-image.svg";
import { validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import { IAssetEditInfo } from "../asset-edit-container";
import editAssetSettingsValidationSchema from "./asset-edit.validators";

const _AssetEditForm: React.FC<IAssetEditProps> = ({
  isValid,
  t,
  dirty,
  values,
  handleSubmit,
  info,
  errorMessage,
  type,
  isSubmitting
}) => {
  const descriptionTrimmedLength = values.description.trim().length;
  const isAmountAllow = useCallback(
    (currency: CurrencyEnum) => ({ value }: NumberFormatValues) =>
      validateFraction(value, currency),
    []
  );
  return (
    <form id="edit-form" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>
            {type === ASSET.PROGRAM && t("manager.edit-program.title")}
            {type === ASSET.FUND && t("manager.edit-fund.title")}
          </h2>
          <p>{info.title}</p>
        </div>
        <GVFormikField
          type="text"
          name={ASSET_EDIT_FIELDS.title}
          label={t("manager.create-program-page.settings.fields.name")}
          autoComplete="off"
          component={GVTextField}
        />
        <div className="edit-program__description">
          <GVFormikField
            type="textarea"
            name={ASSET_EDIT_FIELDS.description}
            label={t("manager.create-program-page.settings.fields.description")}
            component={GVTextField}
          />
          {descriptionTrimmedLength > 0 && (
            <span className="create-program-settings__description-chars">
              {descriptionTrimmedLength}
              <GVProgramPeriod
                start={0}
                end={500}
                value={descriptionTrimmedLength}
              />
            </span>
          )}
        </div>
        {type === ASSET.PROGRAM && (
          <>
            <GVFormikField
              name={ASSET_EDIT_FIELDS.stopOutLevel}
              label={t(
                "manager.create-program-page.settings.fields.stop-out-level"
              )}
              adornment="%"
              component={GVTextField}
              type="number"
              autoComplete="off"
              decimalScale={4}
            />
            <GVFormikField
              type="checkbox"
              color="primary"
              name={ASSET_EDIT_FIELDS.hasInvestmentLimit}
              label={
                <span>
                  {t(
                    "manager.create-program-page.settings.fields.investment-limit"
                  )}
                </span>
              }
              component={GVCheckbox}
            />
            {values.hasInvestmentLimit && (
              <InputAmountField
                isAllow={isAmountAllow(info.currency!)}
                autoFocus={false}
                name={ASSET_EDIT_FIELDS.investmentLimit}
                label={t(
                  "manager.create-program-page.settings.fields.investment-limit"
                )}
                currency={info.currency ? info.currency : ""}
              />
            )}
          </>
        )}
      </div>
      <div className="dialog__bottom">
        <div className="create-program-settings__logo-title">
          {type === ASSET.PROGRAM &&
            t("manager.create-program-page.settings.fields.upload-logo")}
          {type === ASSET.FUND &&
            t("manager.create-fund-page.settings.fields.upload-logo")}
        </div>
        <div className="create-program-settings__logo-notice">
          {t("manager.create-program-page.settings.fields.upload-logo-rules")}
        </div>
        <div className="create-program-settings__logo-section edit-program__logo-section">
          <div className="create-program-settings__file-field-container">
            <GVFormikField
              name={ASSET_EDIT_FIELDS.logo}
              component={InputImage}
              defaultImage={ProgramDefaultImage}
            />
          </div>
        </div>
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            id="signUpFormSubmit"
            className="invest-form__submit-button"
            disabled={!dirty || !isValid || isSubmitting}
          >
            {t("manager.edit-program.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

export enum ASSET_EDIT_FIELDS {
  stopOutLevel = "stopOutLevel",
  title = "title",
  description = "description",
  logo = "logo",
  investmentLimit = "investmentLimit",
  hasInvestmentLimit = "hasInvestmentLimit"
}

export interface IAssetEditFormOwnProps {
  info: IAssetEditInfo;
  errorMessage: string;
  type: ASSET;
  onSubmit: TAssetEditFormSubmit;
}

export type TAssetEditFormSubmit = (
  data: IAssetEditFormValues,
  setSubmitting: SetSubmittingType
) => void;

export interface IAssetEditFormValues {
  [ASSET_EDIT_FIELDS.title]: string;
  [ASSET_EDIT_FIELDS.description]: string;
  [ASSET_EDIT_FIELDS.logo]: IImageValue;
  [ASSET_EDIT_FIELDS.stopOutLevel]: number;
  [ASSET_EDIT_FIELDS.investmentLimit]: number | null;
}

interface FormValues extends IAssetEditFormValues {
  [ASSET_EDIT_FIELDS.hasInvestmentLimit]?: boolean;
}

export interface IAssetEditProps
  extends FormikProps<FormValues>,
    IAssetEditFormOwnProps,
    InjectedTranslateProps {}

const AssetEditForm = compose<
  React.FC<IAssetEditFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<IAssetEditFormOwnProps, FormValues>({
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        [ASSET_EDIT_FIELDS.stopOutLevel]: props.info.stopOutLevel || 100,
        [ASSET_EDIT_FIELDS.title]: props.info.title,
        [ASSET_EDIT_FIELDS.description]: props.info.description,
        [ASSET_EDIT_FIELDS.logo]: {
          src: props.info.logo.src
        },
        [ASSET_EDIT_FIELDS.hasInvestmentLimit]:
          props.info.investmentLimit !== null,
        [ASSET_EDIT_FIELDS.investmentLimit]: props.info.investmentLimit
      };
    },
    validationSchema: editAssetSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      const { hasInvestmentLimit, investmentLimit, ...others } = values;
      props.onSubmit(
        {
          ...others,
          investmentLimit: hasInvestmentLimit ? investmentLimit : null
        },
        setSubmitting
      );
    }
  }),
  React.memo
)(_AssetEditForm);
export default AssetEditForm;
