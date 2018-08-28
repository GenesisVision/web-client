import { withFormik } from "formik";
import React from "react";

import validationSchema from "./two-factor-code-form.validators";

// import Button from "components/button/button";
// import { Field, withFormik } from "formik";
// import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "pages/auth/login/login.routes";




const TwoFactorCodeForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <div>TODO</div>
    // <form id="twoFactorForm" onSubmit={handleSubmit} noValidate>
    //   <div className="login">
    //     <div className="login__header">Two-factor authentication</div>
    //     <Field
    //       type="text"
    //       name="twoFactorCode"
    //       placeholder="Authentiacation code"
    //       addon="fas fa-key"
    //       component={InputText}
    //     />
    //     <FormError error={error} />
    //     <Button
    //       label="Verify"
    //       id="twoFactorSubmit"
    //       primary
    //       disabled={isSubmitting}
    //     />
    //     <div className="login__separator" />
    //     <div>
    //       Open the two-factor authentication app on your device to view your
    //       authentication code and verify your identity.
    //     </div>
    //     <div className="login__separator" />
    //     <h5>Don’t have your phone?</h5>
    //     <Button
    //       className="login__recovery-link"
    //       href={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
    //       label="Enter a two-factor recovery code"
    //     />
    //   </div>
    // </form>
  );
};

export default withFormik({
  displayName: "twoFactorForm",
  mapPropsToValues: () => ({
    twoFactorCode: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values.twoFactorCode, setSubmitting);
  }
})(TwoFactorCodeForm);
