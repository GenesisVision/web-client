import { Field, withFormik } from "formik";
import React from "react";

import Button from "../../../../../components/button/button";
import FormError from "../../../../../shared/components/form/form-error/form-error";
import GVTextarea from "../../../../../shared/components/form/gv-textarea/gv-textarea";
import InputFile from "../../../../../shared/components/form/input-file/input-file";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import managerAvatar from "../../../../../shared/media/manager-avatar.png";
import programSettingsEditFormValidationSchema from "./program-settings-edit-form.validators";

const ProgramSettingsEditForm = ({
  programSettings,
  isSubmitting,
  handleSubmit,
  setFieldValue,
  error,
  values
}) => {
  return (
    <form
      id="editProgramForm"
      onSubmit={handleSubmit}
      className="create-program-form"
      noValidate
    >
      <div className="create-program-form__header">Program Settings</div>
      <div className="create-program-form__program-detail">
        <div className="create-program-form__program-description">
          <Field
            name="logo"
            label="Program Logo"
            className="create-program-form__program-image"
            component={InputFile}
            defaultImage={managerAvatar}
          />
          <Field
            material
            name="title"
            label="Program Title"
            component={InputText}
          />
          <Field
            name="description"
            label="Description"
            component={GVTextarea}
          />
        </div>
        <div className="create-program-form__program-settings">
          <Field
            material
            readOnly
            name="login"
            label="Login"
            field={{ value: programSettings.login }}
            component={InputText}
          />
          <Field
            material
            readOnly
            name="brokerTitle"
            label="Broker"
            field={{ value: programSettings.brokerTitle }}
            component={InputText}
          />
          <Field
            material
            readOnly
            name="brokerTradeServerTitle"
            label="Broker Server"
            field={{ value: programSettings.brokerTradeServerTitle }}
            component={InputText}
          />
        </div>
      </div>
      <FormError error={error} />
      <Button
        label="Edit Program"
        type="submit"
        id="editProgramSubmit"
        disabled={isSubmitting}
        className="create-program-form__submit"
        primary
      />
    </form>
  );
};

export default withFormik({
  displayName: "programSettingsEditForm",
  mapPropsToValues: ({ programSettings }) => ({
    logoId: programSettings.logo,
    logo: {
      src: programSettings.logoSrc,
      filename: "image.png",
      filetype: "image/png",
      cropped: null
    },
    title: programSettings.title,
    description: programSettings.description
  }),
  validationSchema: programSettingsEditFormValidationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ProgramSettingsEditForm);
