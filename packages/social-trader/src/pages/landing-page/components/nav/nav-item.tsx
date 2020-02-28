import classNames from "classnames";
import Link from "components/link/link";
import { useTranslation } from "i18n";
import { useRouter } from "next/router";
import NavSubList from "pages/landing-page/components/nav/nav-sublist";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React, { useCallback, useState } from "react";

interface INavItemProps extends TNavHeader {
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavItem: React.FC<INavItemProps> = ({
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
  const { route } = useRouter();
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
    <li
      className={classNames("nav-list__item", {
        "nav-list__item--hide-mobile": hideMobile,
        "nav-list__item--sub-open": subOpen
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <>
        {href && href.includes("http") ? (
          <a title={name} href={href} className="nav-list__link">
            {icon && <span className="nav-list__link-icon">{icon}</span>}
            {t(name)}
          </a>
        ) : (
          <Link
            title={t(name)}
            onClick={onClick}
            to={{ pathname: href as string, state }}
            className="nav-list__link"
          >
            {icon && <span className="nav-list__link-icon">{icon}</span>}
            {t(name)}
          </Link>
        )}
        {subNav && (
          <NavSubList subNav={subNav} onClick={onClick} subNavOpen={subOpen} />
        )}
      </>
    </li>
  );
};
const NavItem = React.memo(_NavItem);
export default NavItem;
