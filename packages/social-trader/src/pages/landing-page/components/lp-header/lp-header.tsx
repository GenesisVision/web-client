import { LogoIcon } from "components/icon/logo-icon";
import Link from "components/link/link";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import MobileNav from "pages/landing-page/components/mobile-nav/mobile-nav";
import NavList from "pages/landing-page/components/nav/nav-list";
import { SignupButton } from "pages/landing-page/components/signup-button/signup-button";
import { navFooter, navHeader } from "pages/landing-page/static-data/nav-links";
import {
  $gridColumns,
  $gridGap,
  $gridGapMobile,
  landingContainer
} from "pages/landing-page/styles/landing-styles";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { HOME_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import styled from "styled-components";
import { $landingBg, $mainColor } from "utils/style/colors";
import { getHEXA } from "utils/style/generators";
import {
  mediaBreakpointDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { landingResetLink, transition } from "utils/style/mixins";

const logoHeight = 27;
const $comboLogoWidth = 135;
const $textLogoLetterSpacing = 0.7;
const $textLogoFontSize = 14.9;
const $textLogoLineHeight = 15.1;
const $textLogoWidth = 73;
const $textLogoMargin = 15;
const $logoDivider = 1.57;

const LogoIconContainer = styled.div`
  height: ${logoHeight * $logoDivider}px;
  ${mediaBreakpointTablet(`height: ${logoHeight}px;`)};
`;

const Container = styled.header`
  ${landingContainer};
  ${transition("background-color")};
  background-color: ${$landingBg};
  color: ${$mainColor};
  width: 100%;
  z-index: 3;
  padding-top: 15px;
  padding-bottom: 15px;
  ${mediaBreakpointTablet("padding-top: 40px; padding-bottom: 40px;")};
  ${mediaBreakpointDesktop(`background-color: ${getHEXA($landingBg, 0.5)};`)};

  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${$gridGapMobile};

  ${mediaBreakpointTablet(`
    grid-column-gap: ${$gridGap};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: space-between;
  `)};
  ${mediaBreakpointDesktop(
    `grid-template-columns: repeat(${$gridColumns}, 1fr);`
  )};
`;

const TextLogo = styled.h1`
  letter-spacing: ${$textLogoLetterSpacing / $logoDivider}px;
  width: ${$textLogoWidth / $logoDivider}px;
  text-transform: uppercase;
  font-weight: 800;
  font-size: ${$textLogoFontSize / $logoDivider}px;
  line-height: ${$textLogoLineHeight / $logoDivider}px;
  white-space: pre-wrap;
  margin: 0 0 0 ${$textLogoMargin / $logoDivider}px;
  ${mediaBreakpointTablet(`
    letter-spacing: ${$textLogoLetterSpacing}px;
    font-size: ${$textLogoFontSize}px;
    line-height: ${$textLogoLineHeight}px;
    width: ${$textLogoWidth}px;
    margin: 0 0 0 ${$textLogoMargin}px;
 `)}
`;

const MobileNavContainer = styled.div`
  ${mediaBreakpointDesktop("display: none;")}
`;

const LogoContainer = styled.div`
  grid-column: 2/4;
  justify-self: center;
  ${mediaBreakpointDesktop("grid-column: 1/3; justify-self: start;")}
  ${mediaBreakpointTablet("grid-column: 2/2;")}
`;

const LogoLink = styled(Link)`
  position: relative;
  ${transition("opacity")};
  ${landingResetLink};
  display: block;
`;

const ComboLogo = styled.div`
  display: flex;
  align-items: center;
  width: ${$comboLogoWidth / $logoDivider}px;
  ${mediaBreakpointTablet(`width: ${$comboLogoWidth}px;`)}
`;

const ButtonsContainer = styled.div`
  display: none;
  ${mediaBreakpointDesktop("grid-column: 11/13;")}
  ${mediaBreakpointTablet("display: block; justify-self: end;")}
`;

const LPHeader: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Container>
      <MobileNavContainer>
        <MobileNav navHeader={navHeader} navFooter={navFooter} />
      </MobileNavContainer>
      <LogoContainer>
        <LogoLink
          white
          title={"Go to home page"}
          to={{
            pathname: HOME_ROUTE
          }}
        >
          <ComboLogo>
            <LogoIconContainer>
              <LogoIcon primary />
            </LogoIconContainer>
            <TextLogo>Genesis Vision</TextLogo>
          </ComboLogo>
        </LogoLink>
      </LogoContainer>
      <NavList menuItems={navHeader} />
      <ButtonsContainer>
        {isAuthenticated ? (
          <JoinButton
            eventLabel={t("landing-page:buttons.dashboard")}
            color="secondary"
            href={OVERVIEW_ROUTE}
          >
            {t("landing-page:buttons.dashboard")}
          </JoinButton>
        ) : (
          <SignupButton
            eventLabel={t("landing-page:buttons.get-started")}
            color={"secondary"}
          >
            {t("landing-page:buttons.get-started")}
          </SignupButton>
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default LPHeader;
