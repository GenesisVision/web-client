import classnames from "classnames";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { passwordValidator } from "shared/utils/validators/validators";
import { object, ref, string } from "yup";

const PasswordChangeForm = props => {
  const { t, touched, values, errors, handleSubmit } = props;
  const className = classnames({
    "change-password__equal":
      !errors.password &&
      !errors.confirmPassword &&
      touched.confirmPassword &&
      values.password === values.confirmPassword
  });
  return (
    <form
      id="change-password"
      className="change-password"
      onSubmit={handleSubmit}
      noValidate
    >
      <GVFormikField
        component={GVTextField}
        label={t("password-change.current-password")}
        name="oldPassword"
        type="password"
        autoComplete="new-password"
      />
      <div className="change-password__new">
        <GVFormikField
          className={className}
          component={GVTextField}
          label={t("password-change.password")}
          type="password"
          name="password"
          autoComplete="new-password"
        />
        <GVFormikField
          className={className}
          component={GVTextField}
          label={t("password-change.confirm-password")}
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
        />
      </div>
      <div className="form-error">{props.errorMessage}</div>
      <GVButton type="submit" disabled={props.isPending}>
        {t("buttons.confirm")}
      </GVButton>
    </form>
  );
};

PasswordChangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isPending: PropTypes.bool
};

export default compose(
  translate(),
  withFormik({
    displayName: "change-password",
    mapPropsToValues: () => ({
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        oldPassword: string().required(t("Password is required")),
        password: passwordValidator,
        confirmPassword: string()
          .oneOf([ref("password")], t("Passwords don't match."))
          .required(t("Confirm Password is required"))
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(PasswordChangeForm);
