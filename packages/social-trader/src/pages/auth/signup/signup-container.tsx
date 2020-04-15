import { Push } from "components/link/link";
import useApiRequest from "hooks/api-request.hook";
import { useEmailPendingState } from "pages/auth/auth.service";
import CaptchaContainer from "pages/auth/captcha-container";
import { signUp } from "pages/auth/signup/services/signup.service";
import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import { SIGNUP_ROUTE_PENDING } from "pages/auth/signup/signup.constants";
import React, { useCallback } from "react";

const _SignupContainer: React.FC<ISignupContainerProps> = ({
  showLogin,
  referrer,
  utmSource,
  referralCode
}) => {
  const { storeEmailPendingState } = useEmailPendingState();

  const successMiddleware = (email: string) => {
    storeEmailPendingState({ email });
    Push(SIGNUP_ROUTE_PENDING);
  };
  const { sendRequest: request, errorMessage } = useApiRequest({
    request: signUp,
    middleware: [successMiddleware]
  });
  const requestHandle = useCallback(
    values => {
      return request({
        ...values,
        refCode: referralCode,
        utmSource: {
          urlParams: utmSource,
          referer: referrer
        }
      });
    },
    [referralCode, utmSource]
  );
  return (
    <div className="signup">
      <CaptchaContainer
        request={requestHandle}
        renderForm={handle => (
          <SignUpForm
            showLogin={showLogin}
            referer={referrer}
            urlParams={utmSource}
            refCode={referralCode}
            onSubmit={handle}
            error={errorMessage}
          />
        )}
      />
    </div>
  );
};

export interface ISignupContainerProps {
  showLogin?: boolean;
  referrer?: string;
  referralCode?: string;
  utmSource?: string;
}

const SignupContainer = React.memo(_SignupContainer);
export default SignupContainer;
