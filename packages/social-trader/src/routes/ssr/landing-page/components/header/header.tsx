import "./header.scss";

import Link from "components/link/link";
import * as React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import { MobileBurger } from "routes/ssr/landing-page/components/mobile-burger/mobile-burger";
import NavList from "routes/ssr/landing-page/components/nav/nav-list";
import Logo from "routes/ssr/landing-page/images/logos/logo.svg";
import { navHeader, START_ROUTE } from "routes/ssr/landing-page/routes/nav";

const _Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__row">
        <div className="header__burger">
          <MobileBurger />
        </div>
        <NavList menuItems={navHeader} className="header__mobile-menu" />
        <Link
          className="header__logo"
          to={{
            pathname: HOME_ROUTE
          }}
        >
          <img src={Logo} alt="genesis vision" />
        </Link>
        <NavList menuItems={navHeader} className="header__nav" />
        <Link
          className="header__link"
          to={{
            pathname: START_ROUTE
          }}
        >
          Get started
        </Link>
      </div>
    </header>
  );
};

const Header = React.memo(_Header);
export default Header;
