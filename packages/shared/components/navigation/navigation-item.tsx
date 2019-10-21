import * as React from "react";
import { NavLink } from "react-router-dom";
import GVButton from "shared/components/gv-button";

interface INavigationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
  title?: string;
  onClick(): void;
}

const _NavigationButton: React.FC<INavigationButtonProps> = ({
  icon,
  title,
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
  href: string | { pathname: string; state: string };
  icon: JSX.Element;
  title?: string;
  exact?: boolean;
  onClick?(): void;
}

const _NavigationItem: React.FC<INavigationItemProps> = ({
  href,
  icon,
  title,
  children,
  ...other
}) => (
  <NavLink
    className="navigation__item"
    activeClassName="navigation__item--active"
    to={href}
    title={title}
    {...other}
  >
    {<icon.type {...icon.props} className="navigation__icon" />}
    <span className="navigation__link">{children}</span>
  </NavLink>
);

const NavigationItem = React.memo(_NavigationItem);
export default NavigationItem;
