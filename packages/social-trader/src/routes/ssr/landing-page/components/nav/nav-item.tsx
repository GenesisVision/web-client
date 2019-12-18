import classNames from "classnames";
import Link from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { useRouter } from "next/router";
import React from "react";

interface INavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  name: string;
  href?: string | { pathname: string; state: string };
  icon?: JSX.Element;
}

const _NavItem: React.FC<INavItemProps> = ({ href, name, icon, state }) => {
  const { route } = useRouter();
  return (
    <li className="nav__item">
      <Link
        to={{ pathname: href as string, state }}
        className={classNames("nav__link", {
          "nav__link--active": route.startsWith(
            normalizeUrlString(String(href))
          )
        })}
      >
        {icon && <span className="b-nav__link-icon">{icon}</span>}
        {name}
      </Link>
    </li>
  );
};
const NavItem = React.memo(_NavItem);
export default NavItem;
