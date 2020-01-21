import "./lp-header.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import logo from "media/logo.svg";
import React from "react";
import { HOME_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import MobileNav from "routes/ssr/landing-page/components/mobile-nav/mobile-nav";
import NavList from "routes/ssr/landing-page/components/nav/nav-list";
import {
  navFooter,
  navHeader
} from "routes/ssr/landing-page/static-data/nav-links";
import authService from "services/auth-service";

const LPHeader: React.FC = () => {
  const isAuthenticated = authService.isAuthenticated();
  return (
    <header className="lp-header">
      <div className="lp-header__container">
        <div className="lp-header__row">
          <div className="lp-header__burger">
            <MobileNav navHeader={navHeader} navFooter={navFooter} />
          </div>
          <div className="lp-header__logo">
            <Link
              className="lp-header__logo-link"
              to={{
                pathname: HOME_ROUTE
              }}
            >
              <div className="lp-header__combo-logo">
                <ImageBaseElement src={logo} />
                <h1 className="lp-header__text-logo">Genesis Vision</h1>
              </div>
            </Link>
          </div>
          <NavList menuItems={navHeader} className="lp-header__nav" />
          <div className="lp-header__start-btn">
            <LPButton
              color="secondary"
              href={isAuthenticated ? OVERVIEW_ROUTE : SIGNUP_ROUTE}
            >
              {isAuthenticated ? "Dashboard" : "Get started"}
            </LPButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;
