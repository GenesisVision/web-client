import clsx from "clsx";
import { BodyFix } from "components/modal/modal";
import { MobileBurger } from "pages/landing-page/components/mobile-burger/mobile-burger";
import NavList from "pages/landing-page/components/nav/nav-list";
import SeoList from "pages/landing-page/components/seo-links/seo-list";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React, { useCallback, useState } from "react";

import styles from "./mobile-nav.module.scss";

interface Props {
  className?: string;
  navHeader: TNavHeader[];
  navFooter: TNavHeader[];
}

const _MobileNav: React.FC<Props> = ({ className, navHeader, navFooter }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleMenuClick = useCallback(() => {
    setOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const handleLinkClick = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <MobileBurger menuOpen={isOpenMenu} onClick={handleMenuClick} />
      <div
        className={clsx(styles["mobile-nav"], className, {
          [styles["mobile-nav--open"]]: isOpenMenu
        })}
      >
        {isOpenMenu ? (
          <>
            <BodyFix />
            <NavList
              onClick={handleLinkClick}
              menuItems={navHeader}
              subNavOpen
              isMobile
            />
            <SeoList
              seoItems={navFooter}
              className={styles["mobile-nav__seo-list"]}
              isMobile
            />
          </>
        ) : null}
      </div>
    </>
  );
};

const MobileNav = React.memo(_MobileNav);
export default MobileNav;
