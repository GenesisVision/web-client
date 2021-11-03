import clsx from "clsx";
import { BodyFix } from "components/modal/modal";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import { MobileBurger } from "pages/landing-page/components/mobile-burger/mobile-burger";
import NavList from "pages/landing-page/components/nav/nav-list";
import SeoList from "pages/landing-page/components/seo-links/seo-list";
import { SignupButton } from "pages/landing-page/components/signup-button/signup-button";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React, { useCallback, useState } from "react";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";

import styles from "./mobile-nav.module.scss";

interface Props {
  className?: string;
  navHeader: TNavHeader[];
  navFooter: TNavHeader[];
}

const ButtonContainer = styled.div`
  display: block;
  padding-top: 20px;
  font-size: 14px;
  font-weight: 500;
  ${mediaBreakpointTablet("display: none;")}
`;

const _MobileNav: React.FC<Props> = ({ className, navHeader, navFooter }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();
  const isAuthenticated = authService.isAuthenticated();

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
            <ButtonContainer>
              {isAuthenticated ? (
                <JoinButton
                  eventLabel={t("landing-page:buttons.dashboard")}
                  color="secondary"
                  isText
                  href={OVERVIEW_ROUTE}
                >
                  {t("landing-page:buttons.dashboard")}
                </JoinButton>
              ) : (
                <SignupButton
                  eventLabel={t("landing-page:buttons.get-started")}
                  color={"secondary"}
                  isText
                  isSignup
                >
                  {t("landing-page:buttons.get-started")}
                </SignupButton>
              )}
            </ButtonContainer>
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
