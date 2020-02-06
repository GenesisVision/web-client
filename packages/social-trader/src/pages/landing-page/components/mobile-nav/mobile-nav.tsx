import "./mobile-nav.scss";

import classNames from "classnames";
import { BodyFix } from "components/modal/modal";
import { MobileBurger } from "pages/landing-page/components/mobile-burger/mobile-burger";
import NavList from "pages/landing-page/components/nav/nav-list";
import SeoList from "pages/landing-page/components/seo-links/seo-list";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

interface Props {
  className?: string;
  navHeader: TNavHeader[];
  navFooter: TNavHeader[];
}

interface States {
  menuOpen: boolean;
}

class MobileNav extends React.Component<Props, States> {
  state = {
    menuOpen: false
  };

  handleMenuClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  handleLinkClick = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const { className, navHeader, navFooter } = this.props;
    const { menuOpen } = this.state;

    return (
      <>
        <MobileBurger menuOpen={menuOpen} onClick={this.handleMenuClick} />
        <div
          className={classNames("mobile-nav", className, {
            "mobile-nav--open": menuOpen
          })}
        >
          {menuOpen ? (
            <>
              <BodyFix />
              <NavList
                className="mobile-nav__list"
                onClick={this.handleLinkClick}
                menuItems={navHeader}
                subNavOpen
              />
              <SeoList seoItems={navFooter} className="mobile-nav__seo-list" />
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default MobileNav;
