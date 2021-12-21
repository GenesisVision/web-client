import Link, { ToType } from "components/link/link";
import NavigationIconWithName from "components/navigation/navigation-icon-with-name";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
import {
  TERMINAL,
  TERMINAL_FUTURES_NAME,
  TERMINAL_SPOT_NAME
} from "routes/trade.routes";
import styled, { css } from "styled-components";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop
} from "utils/style/media";
import { $paddingBig, $paddingSmall, $paddingXsmall } from "utils/style/sizes";

import { normalizeLinkFrom } from "../link/link.helper";

interface INavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    WithRouterProps {
  mobile?: boolean;
  small?: boolean;
  href?: string | ToType;
  icon: JSX.Element;
  exact?: boolean;
  isSecondLevel?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface IStyleProps {
  mobile?: boolean;
  isCurrent?: boolean;
}

const dynamicStyles = css`
  opacity: ${({ isCurrent }: IStyleProps) => (isCurrent ? 1 : 0.4)};
  &:hover {
    opacity: 1;
  }
  ${({ mobile }) =>
    mediaBreakpointLandscapeTablet(
      `${!mobile && "padding: 0"};
      margin-right: ${$paddingXsmall}px;`
    )}
  ${({ mobile }) =>
    mediaBreakpointDesktop(
      `${!mobile && "padding: 0"};
      margin-right: ${$paddingBig}px;`
    )}
  ${({ mobile }) =>
    mediaBreakpointLargeDesktop(
      `margin-right: 70px;
    &:first-child {
        margin-right: ${$paddingBig}px;
    }`
    )}
`;

const styles = css<IStyleProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${$paddingSmall / 2}px ${$paddingSmall}px;
  text-decoration: none;
  position: relative;
  ${dynamicStyles};
`;

const StyledLink = styled(Link)<IStyleProps>`
  ${styles}
`;

const StyledButton = styled.div<IStyleProps>`
  ${styles}
`;

const _NavigationItem: React.FC<INavigationItemProps> = ({
  mobile,
  router,
  small,
  onClick,
  href,
  icon,
  children,
  isSecondLevel
}) => {
  const renderIconWithName = () => (
    <NavigationIconWithName small={small} icon={icon}>
      {children}
    </NavigationIconWithName>
  );

  const isOnSpot = router.asPath.includes(TERMINAL_SPOT_NAME);
  const isOnFutures = router.asPath.includes(TERMINAL_FUTURES_NAME);

  const normalizedHref = !!href && normalizeLinkFrom(href);

  const isSpotCurrent =
    !!normalizedHref && normalizedHref.includes(TERMINAL_SPOT_NAME) && isOnSpot;

  const isFuturesCurrent =
    !!normalizedHref &&
    normalizedHref.includes(TERMINAL_FUTURES_NAME) &&
    isOnFutures;

  const isCurrent =
    (!!normalizedHref &&
      (isSecondLevel
        ? router.pathname === normalizedHref
        : router.route.startsWith(normalizedHref))) ||
    isFuturesCurrent ||
    isSpotCurrent;
  const isUseVanillaLink =
    (isOnSpot || isOnFutures) &&
    !!normalizedHref &&
    normalizedHref.includes(TERMINAL);

  return !!href ? (
    <StyledLink
      mobile={mobile}
      isCurrent={isCurrent}
      to={href}
      itemProp="url"
      isVanillaLink={isUseVanillaLink}
    >
      {renderIconWithName()}
    </StyledLink>
  ) : (
    <StyledButton
      mobile={mobile}
      isCurrent={isCurrent}
      onClick={onClick}
      itemProp="url"
    >
      {renderIconWithName()}
    </StyledButton>
  );
};
const NavigationItem = withRouter(React.memo(_NavigationItem));
export default NavigationItem;
