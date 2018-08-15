import React from "react";
import { connect } from "react-redux";

import registerService from "../service/register-service";
import RegisterForm from "./register-form/register-form";

const RegisterContainer = ({
  isAuthenticated,
  isPending,
  errorMessage,
  register
}) => {
  const handleSubmit = (registerFormData, setSubmitting) => {
    register(registerFormData, setSubmitting);
  };

  return <RegisterForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = ({ registerData, authData }) => {
  const { isPending, errorMessage } = registerData;
  const { isAuthenticated } = authData;
  return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  register: (registerFormData, setSubmitting) => {
    dispatch(registerService.register(registerFormData)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
