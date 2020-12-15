import Link, { ToType } from "components/link/link";
import NavigationIconWithName from "components/navigation/navigation-icon-with-name";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
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
  children
}) => {
  const renderIconWithName = () => (
    <NavigationIconWithName small={small} icon={icon}>
      {children}
    </NavigationIconWithName>
  );

  const isCurrent = !!href && router.route.startsWith(normalizeLinkFrom(href));

  return !!href ? (
    <StyledLink mobile={mobile} isCurrent={isCurrent} to={href}>
      {renderIconWithName()}
    </StyledLink>
  ) : (
    <StyledButton mobile={mobile} isCurrent={isCurrent} onClick={onClick}>
      {renderIconWithName()}
    </StyledButton>
  );
};
const NavigationItem = withRouter(React.memo(_NavigationItem));
export default NavigationItem;
