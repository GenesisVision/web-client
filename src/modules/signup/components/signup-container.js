import React from "react";
import { connect } from "react-redux";

import signUpService from "../service/signup-service";
import SignUpForm from "./signup-form/signup-form";

const SignUpContainer = ({
  isAuthenticated,
  isPending,
  errorMessage,
  signUp
}) => {
  const handleSubmit = (signUpFormData, setSubmitting) => {
    signUp(signUpFormData, setSubmitting);
  };

  return <SignUpForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = ({ signUpData, authData }) => {
  const { isPending, errorMessage } = signUpData;
  const { isAuthenticated } = authData;
  return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  signup: (signUpFormData, setSubmitting) => {
    dispatch(signUpService.signUp(signUpFormData)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
