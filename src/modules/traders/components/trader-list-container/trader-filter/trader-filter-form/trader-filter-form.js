import { withFormik } from "formik";
import React from "react";
import InputRange from "../../../../../../shared/components/form/input-range/input-range";

const RegisterForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  onRegister,
  error
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="filter-form">
        <div className="filter-form__range">
          <InputRange
            type="range"
            id="level"
            name="level"
            touched={touched.name}
            error={errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="register-error">{error}</div>

        <button type="submit" className="button" disabled={isSubmitting}>
          Register
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "register",
  mapPropsToValues: () => ({
    email: "",
    name: "",
    ethAddress: "",
    avatar: null
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    name: Yup.string().required("Nickname is required."),
    ethAddress: Yup.string()
      .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid eth wallet address")
      .required("Wallet is required.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    tournamentService
      .register(values)
      .then(response => {
        props.onRegister({ ok: true });
      })
      .catch(e => {
        setSubmitting(false);
        let erorrMessage = "Internal Server Error";
        if (e.response !== undefined && e.response.body !== null) {
          erorrMessage = e.response.body.errors.map(x => x.message).join(", ");
        }
        props.onRegister({ ok: false, error: erorrMessage });
      });
  }
})(RegisterForm);
