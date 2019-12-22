import "./lp-header.scss";

import Link from "components/link/link";
import * as React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { MainLogo } from "routes/ssr/landing-page/components/main-logo/main-logo";
import { MobileBurger } from "routes/ssr/landing-page/components/mobile-burger/mobile-burger";
import NavList from "routes/ssr/landing-page/components/nav/nav-list";
import {
  navHeader,
  START_ROUTE
} from "routes/ssr/landing-page/static-data/nav-links";

const LPHeader: React.FC = () => {
  return (
    <header className="lp-header">
      <div className="lp-header__container">
        <div className="lp-header__row">
          <div className="lp-header__burger">
            <MobileBurger />
          </div>
          <NavList menuItems={navHeader} className="lp-header__mobile-menu" />
          <div className="lp-header__logo">
            <Link
              className="lp-header__logo-link"
              to={{
                pathname: HOME_ROUTE
              }}
            >
              <MainLogo />
            </Link>
          </div>
          <NavList menuItems={navHeader} className="lp-header__nav" />
          <div className="lp-header__start-btn">
            <LPButton color="secondary" href={START_ROUTE}>
              Get started
            </LPButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;
