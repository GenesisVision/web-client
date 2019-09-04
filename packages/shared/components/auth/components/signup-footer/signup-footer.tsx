import React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";

const _SignUpFooter: React.FC<Props> = ({ ROUTE }) => {
  const [t] = useTranslation();
  return (
    <>
      <span className="signup-footer__desc">
        {t("auth.signup.footer-text")}
      </span>
      <Link to={ROUTE}>
        <a>
          <GVButton variant="outlined" color="secondary">
            {t("auth.login.title")}
          </GVButton>
        </a>
      </Link>
    </>
  );
};

interface Props {
  ROUTE: string;
}

const SignUpFooter = React.memo(_SignUpFooter);
export default SignUpFooter;
