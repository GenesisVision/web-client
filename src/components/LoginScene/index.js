import { connect } from "react-redux";
import React from "react";

import authActions from "../../actions/authActions";
import loginActions from "../../shared/login/actions/index";
import LoginForm from "../../shared/login/components/LoginForm/index";
import routes from "../../utils/constants/routes";

const LoginScene = ({
  location,
  isAuthenticated,
  isPending,
  errorMessage,
  login,
  alreadyAuthenticated
}) => {
  if (isAuthenticated) {
    alreadyAuthenticated();
    return null;
  }

  const { from } = location.state || { from: { pathname: routes.index } };
  const handleSubmit = (loginFormData, setError, setSubmitting) => {
    login(loginFormData, from, setError, setSubmitting);
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.loginData;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  login: (loginFormData, from, setError, setSubmitting) => {
    dispatch(loginActions.loginUser(loginFormData, from))
      .catch(e => {
        setError(e.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  alreadyAuthenticated: () => {
    dispatch(authActions.alreadyAuthenticated());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
