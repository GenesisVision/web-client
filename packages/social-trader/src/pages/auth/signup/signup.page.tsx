import "./signup.scss";

import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import CaptchaContainer from "pages/auth/captcha-container";
import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { useTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, compose } from "redux";
import { AuthRootState, MiddlewareDispatch } from "utils/types";

import { signUp } from "./services/signup.service";

const _SignUpPage: React.FC<Props> = ({
  referrer,
  utmSource,
  referralCode,
  errorMessage,
  service
}) => {
  const [t] = useTranslation();
  return (
    <PageSeoWrapper
      description={"Sign up to the Genesis Vision"}
      title={t("auth.signup.title")}
    >
      <div className="signup">
        <CaptchaContainer
          request={service.signUp}
          renderForm={handle => (
            <SignUpForm
              referer={referrer}
              urlParams={utmSource}
              refCode={referralCode}
              onSubmit={handle}
              error={errorMessage}
            />
          )}
        />
      </div>
    </PageSeoWrapper>
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
  referrer?: string;
  referralCode?: string;
  utmSource?: string;
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
