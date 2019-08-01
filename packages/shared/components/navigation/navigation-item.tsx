import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import GVButton from "shared/components/gv-button";

import Link from "../link/link";

interface INavigationButtonProps {
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

interface INavigationItemProps {
  href: string | { pathname: string; state: string };
  icon: JSX.Element;
  exact?: boolean;
  onClick?(): void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  href,
  icon,
  children
}) => {
  const { route } = useRouter();
  return (
    <Link
      to={href}
      className={classNames("navigation__item", {
        "navigation__item--active": href === route
      })}
    >
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </Link>
  );
};

const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
