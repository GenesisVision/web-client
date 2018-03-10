import { withFormik, Field } from "formik";
import React from "react";

import InputText from "../../../../../shared/components/form/input-text/input-text";

const ProfileForm = ({
  profile,
  isSubmitting,
  handleSubmit,
  error,
  onCancel
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        name="userName"
        placeholder="Username"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        name="firstName"
        placeholder="First Name"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        name="lastName"
        placeholder="Last Name"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        type="email"
        name="email"
        placeholder="Email"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        type="date"
        name="birthday"
        placeholder="Birthday"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        name="documentNumber"
        placeholder="Passport Number"
        addon="fas fa-edit"
        component={InputText}
      />

      <Field
        name="avatar"
        placeholder="Avatar Url"
        addon="fas fa-edit"
        component={InputText}
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
    userName: profile.userName,
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
