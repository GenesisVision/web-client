import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
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
    const handleSubmit = async (user, dispatch) => {
        await login(user, from);
    };

    return <LoginForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = state => {
    const { isPending, errorMessage } = state.loginData;
    const { isAuthenticated } = state.authData;
    return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
    login: async ({ email, password }, from) => {
        try {
            await dispatch(loginActions.loginUser({ email, password }, from));
        } catch (e) {
            /* const { responseError } = e;
            throw new SubmissionError({
              _error: responseError.errors[0].message
            });*/
        }
    },
    alreadyAuthenticated: () => {
        dispatch(authActions.alreadyAuthenticated());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);
