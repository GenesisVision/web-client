import { withFormik } from "formik";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputImage from "shared/components/form/input-image/input-image";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";
import { FUND, PROGRAM } from "shared/constants/constants";
import ProgramDefaultImage from "shared/media/program-default-image.svg";

import editAssetSettingsValidationSchema from "./asset-edit.validators";

const AssetEditForm = ({
  isValid,
  t,
  dirty,
  values,
  info,
  currency,
  handleSubmit,
  title,
  setFieldValue,
  errors,
  notifyError,
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
            {type === PROGRAM && t("manager.edit-program.title")}
            {type === FUND && t("manager.edit-fund.title")}
          </h2>
          <p>{title}</p>
        </div>
        <GVFormikField
          type="text"
          name="title"
          label={t("manager.create-program-page.settings.fields.name")}
          autoComplete="off"
          component={GVTextField}
        />
        <div className="edit-program__description">
          <GVFormikField
            type="textarea"
            name="description"
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
        {type === PROGRAM && (
          <GVFormikField
            name="stopOutLevel"
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
          {type === PROGRAM &&
            t("manager.create-program-page.settings.fields.upload-logo")}
          {type === FUND &&
            t("manager.create-fund-page.settings.fields.upload-logo")}
        </div>
        <div className="create-program-settings__logo-notice">
          {t("manager.create-program-page.settings.fields.upload-logo-rules")}
        </div>
        <div className="create-program-settings__logo-section edit-program__logo-section">
          <div className="create-program-settings__file-field-container">
            <GVFormikField
              name="logo"
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

export default compose(
  translate(),
  withFormik({
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        stopOutLevel: String(props.info.stopOutLevel || 100),
        title: props.info.title,
        description: props.info.description,
        logo: {
          src: props.info.logo.src
        }
      };
    },
    validationSchema: editAssetSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(AssetEditForm);
