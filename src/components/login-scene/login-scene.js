import { connect } from "react-redux";
import React from "react";

import authActions from "../../actions/authActions";
import loginActions from "../../shared/modules/login/actions/login-actions";
import LoginForm from "../../shared/modules/login/components/login-form/login-form";
import routes from "../../utils/constants/routes";

const LoginScene = ({
  location,
  isAuthenticated,
  errorMessage,
  login,
  alreadyAuthenticated
}) => {
  if (isAuthenticated) {
    alreadyAuthenticated();
    return null;
  }

  const { from } = location.state || { from: { pathname: routes.index } };
  const handleSubmit = (loginFormData, setSubmitting) => {
    login(loginFormData, from, setSubmitting);
  };

  return <LoginForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = state => {
  const { errorMessage } = state.loginData;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  login: (loginFormData, from, setSubmitting) => {
    dispatch(loginActions.loginUser(loginFormData, from)).catch(() => {
      setSubmitting(false);
    });
  },
  alreadyAuthenticated: () => {
    dispatch(authActions.alreadyAuthenticated());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
