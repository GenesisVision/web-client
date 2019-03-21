import { GVButton } from "gv-react-components";
import { LOGIN_ROUTE } from "manager-web-portal/src/pages/auth/login/login.routes";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface INavigationButtonProps {
  icon: JSX.Element;
  title?: string;
  onClick(): void;
}

export const NavigationButton: React.FC<INavigationButtonProps> = ({
  icon,
  title,
  children,
  onClick
}) => {
  return (
    <GVButton className="navigation__button" variant="text" onClick={onClick}>
      <React.Fragment>
        {<icon.type {...icon.props} className="navigation__icon" />}
        <span className="navigation__link">{children}</span>
      </React.Fragment>
    </GVButton>
  );
};

interface INavigationItemProps {
  href: string | { pathname: string; state: string };
  icon: JSX.Element;
  title?: string;
  exact?: boolean;
  onClick?(): void;
}

const NavigationItem: React.FC<INavigationItemProps> = ({
  href,
  icon,
  title,
  children,
  ...other
}) => {
  return (
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
};

export default NavigationItem;
