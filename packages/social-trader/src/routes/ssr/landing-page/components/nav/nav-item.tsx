import classNames from "classnames";
import Link from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { useRouter } from "next/router";
import React from "react";

interface INavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  name: string;
  href?: string;
  icon?: JSX.Element;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavItem: React.FC<INavItemProps> = ({
  href,
  name,
  icon,
  state,
  onClick
}) => {
  const { route } = useRouter();
  return (
    <li className="nav-list__item">
      <Link
        onClick={onClick}
        to={{ pathname: href as string, state }}
        className={classNames("nav-list__link", {
          "nav-list__link--active": route.startsWith(
            normalizeUrlString(String(href))
          )
        })}
      >
        {icon && <span className="nav-list__link-icon">{icon}</span>}
        {name}
      </Link>
    </li>
  );
};
const NavItem = React.memo(_NavItem);
export default NavItem;
