import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";
import { ASSET } from "shared/constants/constants";
import ProgramDefaultImage from "shared/media/program-default-image.svg";
import { SetSubmittingType } from "shared/utils/types";

import { IAssetEditInfo } from "../asset-edit-container";
import editAssetSettingsValidationSchema from "./asset-edit.validators";

const _AssetEditForm: React.FC<IAssetEditProps> = ({
  isValid,
  t,
  dirty,
  values,
  handleSubmit,
  info,
  serverError,
  type,
  isSubmitting
}) => {
  const descriptionTrimmedLength = values.description.trim().length;
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
          <GVFormikField
            name={ASSET_EDIT_FIELDS.stopOutLevel}
            label={t(
              "manager.create-program-page.settings.fields.stop-out-level"
            )}
            adornment="%"
            component={GVTextField}
            InputComponent={NumberFormat}
            autoComplete="off"
            decimalScale={4}
          />
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
        <div className="form-error">{serverError}</div>
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
  logo = "logo"
}

export interface IAssetEditFormOwnProps {
  info: IAssetEditInfo;
  serverError: string;
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
}

export interface IAssetEditProps
  extends FormikProps<IAssetEditFormValues>,
    IAssetEditFormOwnProps,
    InjectedTranslateProps {}

const AssetEditForm = compose<React.FunctionComponent<IAssetEditFormOwnProps>>(
  React.memo,
  translate(),
  withFormik<IAssetEditFormOwnProps, IAssetEditFormValues>({
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        [ASSET_EDIT_FIELDS.stopOutLevel]: props.info.stopOutLevel || 100,
        [ASSET_EDIT_FIELDS.title]: props.info.title,
        [ASSET_EDIT_FIELDS.description]: props.info.description,
        [ASSET_EDIT_FIELDS.logo]: {
          src: props.info.logo.src
        }
      };
    },
    validationSchema: editAssetSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_AssetEditForm);
export default AssetEditForm;
