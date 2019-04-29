import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { connect } from "react-redux";
import { signUp } from "shared/components/auth/signup/services/signup.service";
import { getRef } from "shared/utils/ref";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import { RegisterViewModel } from "../actions/signup.actions";

class _SignUpFormContainer extends React.PureComponent<Props> {
  handleSubmit = (
    signUpFormData: RegisterViewModel,
    setSubmitting: SetSubmittingType
  ) => {
    this.props.service.signUp(signUpFormData, setSubmitting);
  };
  refCode = getRef();

  render() {
    const { errorMessage } = this.props;
    return (
      <SignUpForm
        refCode={this.refCode}
        onSubmit={this.handleSubmit}
        error={errorMessage}
      />
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { signUpData } = state;
  const { errorMessage } = signUpData;
  return { errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    signUp: (signUpData: RegisterViewModel, setSubmitting: SetSubmittingType) =>
      dispatch(signUp(signUpData, setSubmitting))
  }
});

interface Props extends StateProps, DispatchProps {}

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  service: {
    signUp: (
      signUpData: RegisterViewModel,
      setSubmitting: SetSubmittingType
    ) => void;
  };
}

const SignUpFormContainer = connect<
  StateProps,
  DispatchProps,
  null,
  AuthRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SignUpFormContainer);
export default SignUpFormContainer;
