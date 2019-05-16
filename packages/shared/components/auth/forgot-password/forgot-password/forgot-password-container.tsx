import * as React from "react";
import { connect } from "react-redux";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import { forgotPassword } from "../services/forgot-password.service";
import ForgotPassword, { IForgotPasswordFormValues } from "./forgot-password";

const _ForgotPasswordContainer: React.FC<Props> = ({
  isPending,
  errorMessage,
  forgotPassword
}) => <ForgotPassword error={errorMessage} onSubmit={forgotPassword} />;

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { isPending, errorMessage } = state.passwordRestoreData.forgot;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  forgotPassword: (formData, setSubmitting) => {
    dispatch(forgotPassword(formData)).catch(() => {
      setSubmitting(false);
    });
  }
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {}

interface DispatchProps {
  forgotPassword: (
    formData: IForgotPasswordFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

interface StateProps {
  isPending: boolean;
  errorMessage: string;
}

const ForgotPasswordContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AuthRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_ForgotPasswordContainer);
export default ForgotPasswordContainer;
