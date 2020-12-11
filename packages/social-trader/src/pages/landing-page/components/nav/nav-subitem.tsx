import { useTranslation } from "i18n";
import {
  NavSubItemA,
  NavSubItemContainer,
  NavSubItemLink
} from "pages/landing-page/components/nav/nav.styles";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

interface INavSubItemProps extends TNavHeader {
  isMobile?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const _NavSubItem: React.FC<INavSubItemProps> = ({
  isMobile,
  href,
  name,
  icon,
  state,
  hideMobile,
  onClick
}) => {
  const { t } = useTranslation();
  return (
    <NavSubItemContainer isMobile={isMobile} hideMobile={hideMobile}>
      {href && href.includes("http") ? (
        <NavSubItemA isMobile={isMobile} title={name} href={href}>
          {icon && <span>{icon}</span>}
          {t(name)}
        </NavSubItemA>
      ) : (
        <NavSubItemLink
          isMobile={isMobile}
          title={t(name)}
          onClick={onClick}
          to={{ pathname: href as string, state }}
        >
          {icon && <span>{icon}</span>}
          {t(name)}
        </NavSubItemLink>
      )}
    </NavSubItemContainer>
  );
};

const NavSubItem = React.memo(_NavSubItem);
export default NavSubItem;
