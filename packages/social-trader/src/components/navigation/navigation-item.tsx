import classNames from "classnames";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useRouter } from "next/router";
import React from "react";

import { normalizeUrlString } from "../link/link.helper";

interface INavigationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
  title?: string;
  onClick(): void;
}

const _NavigationButton: React.FC<INavigationButtonProps> = ({
  icon,
  children,
  onClick
}) => (
  <GVButton className="navigation__button" variant="text" onClick={onClick}>
    <>
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </>
  </GVButton>
);
export const NavigationButton = React.memo(_NavigationButton);

interface INavigationItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  href?: string | { pathname: string; state: string };
  icon: JSX.Element;
  exact?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  onClick,
  href,
  icon,
  children,
  state
}) => {
  const { route } = useRouter();
  return (
    (!!href && (
      <Link
        to={{ pathname: href as string, state }}
        className={classNames("navigation__item", {
          "navigation__item--active": route.startsWith(
            normalizeUrlString(String(href))
          )
        })}
      >
        {<icon.type {...icon.props} className="navigation__icon" />}
        <span className="navigation__link">{children}</span>
      </Link>
    )) || (
      <div className="navigation__item" onClick={onClick}>
        {<icon.type {...icon.props} className="navigation__icon" />}
        <div className="navigation__link">{children}</div>
      </div>
    )
  );
};
const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
