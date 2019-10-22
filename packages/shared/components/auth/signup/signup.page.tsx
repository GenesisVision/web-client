import "./signup.scss";

import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, compose } from "redux";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";
import { getRef } from "shared/utils/ref";
import { AuthRootState, MiddlewareDispatch } from "shared/utils/types";

import CaptchaContainer from "../captcha-container";
import { signUp } from "./services/signup.service";

const _SignUpPage: React.FC<Props> = ({ errorMessage, service }) => {
  const refCode = getRef();
  return (
    <div className="signup">
      <AuthTabs authPartUrl={SIGNUP_ROUTE} />
      <CaptchaContainer
        request={service.signUp}
        renderForm={handle => (
          <SignUpForm
            refCode={refCode}
            onSubmit={handle}
            error={errorMessage}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { signUpData } = state;
  const { errorMessage } = signUpData;
  return { errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      signUp
    },
    dispatch
  )
});

interface StateProps {
  errorMessage: string;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  signUp: typeof signUp;
}

interface OwnProps {}

interface Props extends OwnProps, StateProps, DispatchProps {}

const SignUpPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_SignUpPage);
export default SignUpPage;
