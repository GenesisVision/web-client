import "./header.scss";

import Link from "components/link/link";
import * as React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import { MobileBurger } from "routes/ssr/landing-page/components/mobile-burger/mobile-burger";
import NavList from "routes/ssr/landing-page/components/nav/nav-list";
import MainLogo from "routes/ssr/landing-page/images/logos/main-logo.svg";
import { navHeader, START_ROUTE } from "routes/ssr/landing-page/routes/nav";

const _Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__row">
        <div className="header__burger">
          <MobileBurger />
        </div>
        <NavList menuItems={navHeader} className="header__mobile-menu" />
        <div className="header__logo">
          <Link
            className="header__logo-link"
            to={{
              pathname: HOME_ROUTE
            }}
          >
            <img
              src={MainLogo}
              className="header__logo-img"
              alt="genesis vision"
            />
          </Link>
        </div>
        <NavList menuItems={navHeader} className="header__nav" />
        <div className="header__start-btn">
          <Link
            className="header__start-btn-link"
            to={{
              pathname: START_ROUTE
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};

const Header = React.memo(_Header);
export default Header;
