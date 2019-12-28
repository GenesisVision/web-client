import classNames from "classnames";
import Link from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { useRouter } from "next/router";
import React from "react";
import { TNavHeader } from "routes/ssr/landing-page/static-data/nav-links";

interface INavSubItemProps extends TNavHeader {
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavSubItem: React.FC<INavSubItemProps> = ({
  href,
  name,
  icon,
  state,
  hideMobile,
  onClick
}) => {
  const { route } = useRouter();
  return (
    <li
      className={classNames("nav-list__item", {
        "nav-list__item--hide-mobile": hideMobile
      })}
    >
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
const NavSubItem = React.memo(_NavSubItem);
export default NavSubItem;
