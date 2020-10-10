import { useTranslation } from "i18n";
import NavSubList from "pages/landing-page/components/nav/nav-sublist";
import {
  NavItemA,
  NavItemContainer,
  NavItemLink
} from "pages/landing-page/components/nav/nav.styles";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React, { useCallback, useState } from "react";

interface INavItemProps extends TNavHeader {
  isMobile?: boolean;
  subNavOpen?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const _NavItem: React.FC<INavItemProps> = ({
  isMobile,
  href,
  name,
  icon,
  state,
  hideMobile,
  subNav,
  subNavOpen,
  onClick
}) => {
  const { t } = useTranslation();
  const [subOpen, setSubOpen] = useState(subNavOpen);
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!subNav) return;
      if (!subOpen) setSubOpen(true);
    },
    [subOpen]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!subNav) return;
      if (subOpen) setSubOpen(false);
    },
    [subOpen]
  );
  return (
    <NavItemContainer
      isMobile={isMobile}
      hideMobile={hideMobile}
      subOpen={subOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <>
        {href && href.includes("http") ? (
          <NavItemA isMobile={isMobile} title={name} href={href}>
            {icon && <span>{icon}</span>}
            {t(name)}
          </NavItemA>
        ) : (
          <NavItemLink
            isMobile={isMobile}
            white
            title={t(name)}
            onClick={onClick}
            to={{ pathname: href as string, state }}
          >
            {icon && <span>{icon}</span>}
            {t(name)}
          </NavItemLink>
        )}
        {subNav && (
          <NavSubList
            isMobile={isMobile}
            subNav={subNav}
            onClick={onClick}
            subNavOpen={subOpen}
          />
        )}
      </>
    </NavItemContainer>
  );
};

const NavItem = React.memo(_NavItem);
export default NavItem;
