import { GVButton } from "gv-react-components";
import React from "react";
import { NavLink } from "react-router-dom";

export const NavigationButton = ({ icon, title, children, onClick }) => {
  return (
    <GVButton className="navigation__button" variant="text" onClick={onClick}>
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </GVButton>
  );
};

const NavigationItem = ({ href, icon, title, children, ...other }) => {
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

NavigationItem.defaultProps = {
  active: false
};

export default NavigationItem;
