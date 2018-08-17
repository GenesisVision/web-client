import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = ({ href, icon, title, children }) => {
  return (
    <NavLink
      className="navigation__item"
      activeClassName="navigation__item--active"
      to={href}
      title={title}
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
