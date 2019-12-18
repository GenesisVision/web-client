import "./header.scss";

import Link from "components/link/link";
import * as React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import { MobileBurger } from "routes/ssr/landing-page/components/mobile-burger/mobile-burger";
import Logo from "routes/ssr/landing-page/images/logos/logo.svg";

const _Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__row">
        <div className="header__burger">
          <MobileBurger />
        </div>
        <div className="mobile-menu"></div>
        <Link
          className="header__logo"
          to={{
            pathname: HOME_ROUTE
          }}
        >
          <img src={Logo} alt="genesis vision" />
        </Link>
        <Link
          className="header__link"
          to={{
            pathname: "https://genesis.vision/investor/"
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
