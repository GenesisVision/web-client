import "./auth-layout.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NavLink } from "react-router-dom";
import GvBrand from "shared/components/gv-brand/gv-brand";
import GvLogo from "shared/components/gv-logo/gv-logo";
import { ROLE_ENV } from "shared/constants/constants";

import { ILoginFooterProps } from "../login-footer/login-footer";

const QUOTES_COUNT = 5;

class _AuthLayout extends React.PureComponent<Props, State> {
  state = {
    quoteNo: Math.floor(Math.random() * QUOTES_COUNT + 1)
  };

  render() {
    const {
      t,
      children,
      title,
      Footer,
      HOME_ROUTE,
      SIGNUP_ROUTE,
      LOGIN_ROUTE
    } = this.props;
    const { quoteNo } = this.state;

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
            {t(`${ROLE_ENV}.auth-quotes.${quoteNo}.quote`)}
            <footer className="auth__quote-footer">
              —{" "}
              <cite className="auth__quote-author">
                {t(`${ROLE_ENV}.auth-quotes.${quoteNo}.author`)}
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
  }
}

interface Props extends InjectedTranslateProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  title: string;
  HOME_ROUTE: string;
  SIGNUP_ROUTE?: string;
  LOGIN_ROUTE?: string;
}

interface State {
  quoteNo: number;
}

const AuthLayout = translate()(_AuthLayout);
export default AuthLayout;
