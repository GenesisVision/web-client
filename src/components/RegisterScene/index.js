import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
import React from "react";

import { registerActions } from "../../shared/register/actions";
import authActions from "../../actions/authActions";
import RegisterForm from "../../shared/register/components/RegisterForm";

const RegisterScene = ({
                           isAuthenticated,
                           isPending,
                           errorMessage,
                           register,
                           alreadyAuthenticated
                       }) => {
    if (isAuthenticated) {
        alreadyAuthenticated();
        return null;
    }

    const handleSubmit = async user => {
        await register(user);
    };

    return <RegisterForm onSubmit={handleSubmit} />;
};

const mapStateToProps = state => {
    const { isPending, errorMessage } = state.registerData;
    const { isAuthenticated } = state.authData;
    return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
    register: async user => {
        try {
            await dispatch(registerActions.registerUser(user));
        } catch (e) {
            throw new SubmissionError({
                _error: e.message
            });
        }
    },
    alreadyAuthenticated: () => {
        dispatch(authActions.alreadyAuthenticated());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScene);
