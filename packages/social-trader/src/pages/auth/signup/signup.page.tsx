import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import SignupContainer, {
  ISignupContainerProps
} from "pages/auth/signup/signup-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _SignUpPage: React.FC<Props> = props => {
  const [t] = useTranslation();

  return (
    <PageSeoWrapper
      description={"Sign up to the Genesis Vision"}
      title={t("auth.signup.title")}
    >
      <SignupContainer {...props} />
    </PageSeoWrapper>
  );
};

interface Props extends ISignupContainerProps {}

const SignUpPage = React.memo(_SignUpPage);
export default SignUpPage;
