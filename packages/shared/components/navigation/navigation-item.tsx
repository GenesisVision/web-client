import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";

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
  pathname: string;
  state?: string;
  icon: JSX.Element;
  exact?: boolean;
  onClick?(): void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  pathname,
  icon,
  children,
  state
}) => {
  const { route } = useRouter();
  return (
    <Link
      to={{ pathname: pathname, state }}
      className={classNames("navigation__item", {
        "navigation__item--active": route.startsWith(
          normalizeUrlString(pathname)
        )
      })}
    >
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </Link>
  );
};

const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
