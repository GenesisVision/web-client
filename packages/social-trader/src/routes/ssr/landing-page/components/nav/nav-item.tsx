import classNames from "classnames";
import Link from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import NavSubList from "routes/ssr/landing-page/components/nav/nav-sublist";
import { TNavHeader } from "routes/ssr/landing-page/static-data/nav-links";

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
            {name}
          </a>
        ) : (
          <Link
            onClick={onClick}
            to={{ pathname: href as string, state }}
            className="nav-list__link"
          >
            {icon && <span className="nav-list__link-icon">{icon}</span>}
            {name}
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
