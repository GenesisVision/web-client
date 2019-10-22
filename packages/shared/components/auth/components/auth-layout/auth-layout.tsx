import "./auth-layout.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import GvBrand from "shared/components/gv-brand/gv-brand";
import GvLogo from "shared/components/gv-logo/gv-logo";
import useRole from "shared/hooks/use-role.hook";
import { HOME_ROUTE } from "shared/routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";

const QUOTES_COUNT = 5;

const _AuthLayout: React.FC<Props> = ({
  t,
  children,
  title,
  Footer,
  SIGNUP_ROUTE,
  LOGIN_ROUTE
}) => {
  const role = useRole();
  const quoteNo = Math.floor(Math.random() * QUOTES_COUNT + 1);
  return (
    <div className={"auth page"}>
      <div className="auth__left">
        <NavLink
          className="navigation__link auth__logo"
          activeClassName="navigation__link--active"
          to={HOME_ROUTE}
        >
          <GvLogo />
          <GvBrand />
        </NavLink>
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

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  title: string;
  SIGNUP_ROUTE?: string;
  LOGIN_ROUTE?: string;
}

const AuthLayout = compose<React.FC<OwnProps>>(
  translate(),
  React.memo
)(_AuthLayout);
export default AuthLayout;
