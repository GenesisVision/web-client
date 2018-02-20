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
      <FieldInput
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
        touched={touched.firstName}
        error={errors.firstName}
        addon="fa fa-pencil"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <FieldInput
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
        touched={touched.lastName}
        error={errors.lastName}
        addon="fa fa-pencil"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />

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
        type="date"
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

      <FieldInput
        type="text"
        id="avatar"
        name="avatar"
        placeholder="Avatar Url"
        touched={touched.avatar}
        error={errors.avatar}
        addon="fa fa-pencil"
        value={values.avatar}
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
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    birthday: profile.birthday,
    documentNumber: profile.documentNumber,
    avatar: profile.avatar
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ProfileForm);
