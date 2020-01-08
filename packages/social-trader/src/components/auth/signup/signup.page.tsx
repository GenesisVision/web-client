import "./signup.scss";

import { REFERRAL_CODE } from "components/auth/signup/signup.constants";
import { useLocalStorage } from "hooks/localstorage";
import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, compose } from "redux";
import { AuthRootState, MiddlewareDispatch } from "utils/types";

import CaptchaContainer from "../captcha-container";
import { signUp } from "./services/signup.service";

const _SignUpPage: React.FC<Props> = ({
  referralCode,
  errorMessage,
  service
}) => {
  const { getFromStorage } = useLocalStorage();
  const referralCodeFromStorage = getFromStorage(REFERRAL_CODE);
  return (
    <div className="signup">
      <CaptchaContainer
        request={service.signUp}
        renderForm={handle => (
          <SignUpForm
            refCode={referralCodeFromStorage || referralCode}
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

interface OwnProps {
  referralCode?: string;
}

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
