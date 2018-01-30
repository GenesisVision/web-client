import { withFormik } from "formik";
import React from "react";

import FieldInput from "../../../../../shared/components/field-input/field-input";

const ProfileForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleCancel,
  error,
  onCancel
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Edit Profile</h1>
      <FieldInput
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        touched={touched.email}
        error={errors.email}
        addon="fa fa-pencil"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <FieldInput
        type="text"
        id="birthday"
        name="birthday"
        placeholder="Birthday"
        touched={touched.birthday}
        error={errors.birthday}
        addon="fa fa-pencil"
        value={values.birthday}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <FieldInput
        type="text"
        id="documentNumber"
        name="documentNumber"
        placeholder="Passport Number"
        touched={touched.birthday}
        error={errors.birthday}
        addon="fa fa-pencil"
        value={values.documentNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="text-danger">{error && <strong>{error}</strong>}</span>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Submit
        </button>

        <button
          type="button"
          className="btn btn-default ml-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "profileForm",
  mapPropsToValues: ({ profile }) => ({
    email: profile.email || "",
    birthday: profile.birthday || "",
    documentNumber: profile.documentNumber || ""
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ProfileForm);
