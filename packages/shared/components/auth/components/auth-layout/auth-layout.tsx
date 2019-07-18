import "./auth-layout.scss";

import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import GvBrand from "shared/components/gv-brand/gv-brand";
import GvLogo from "shared/components/gv-logo/gv-logo";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { HOME_ROUTE } from "shared/routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";

const QUOTES_COUNT = 5;

const _AuthLayout: NextPage<Props> = ({
  role,
  children,
  title,
  quoteNo,
  Footer,
  SIGNUP_ROUTE,
  LOGIN_ROUTE
}) => {
  const [t] = useTranslation();
  return (
    <div className="root auth page">
      <div className="auth__left">
        <Link href={HOME_ROUTE}>
          <a className="navigation__link auth__logo">
            <GvLogo />
            <GvBrand />
          </a>
        </Link>

        <blockquote className="auth__quote">
          {t(`${role}.auth-quotes.${quoteNo}.quote`)}
          <footer className="auth__quote-footer">
            —{" "}
            <cite className="auth__quote-author">
              {t(`${role}.auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {title && <h1>{title}</h1>}
          {children}
        </div>
        {Footer && (
          <div className="auth__footer">
            <Footer ROUTE={SIGNUP_ROUTE || LOGIN_ROUTE!} />
          </div>
        )}
      </div>
    </div>
  );
};

interface Props extends OwnProps, WithRoleProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  title: string;
  quoteNo: number;
  SIGNUP_ROUTE?: string;
  LOGIN_ROUTE?: string;
  children: React.ReactChild;
}

const AuthLayout = withRole(_AuthLayout);
export default AuthLayout;
