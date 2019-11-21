import "./auth-layout.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import useRole from "hooks/use-role.hook";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { HOME_ROUTE } from "routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";

const _AuthLayout: NextPage<Props> = ({
  quoteNo,
  children,
  titleKey,
  Footer,
  footerAuthRoute
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <div className="root auth page">
      <div className="auth__left">
        <Link
          className="navigation__link auth__logo"
          to={{
            pathname: HOME_ROUTE
          }}
        >
          <>
            <GvLogo />
            <GvBrand />
          </>
        </Link>

        <blockquote className="auth__quote">
          {t(`${role ? `${role}.` : ""}auth-quotes.${quoteNo}.quote`)}
          <footer className="auth__quote-footer">
            —{" "}
            <cite className="auth__quote-author">
              {t(`${role ? `${role}.` : ""}auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {titleKey && <h1>{t(titleKey)}</h1>}
          {children}
        </div>
        {Footer && (
          <div className="auth__footer">
            <Footer ROUTE={footerAuthRoute} />
          </div>
        )}
      </div>
    </div>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  footerAuthRoute: string;
  titleKey: string;
  children: React.ReactChild;
  quoteNo: number;
}

const AuthLayout = React.memo(_AuthLayout);
export default AuthLayout;
