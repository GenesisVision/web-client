import { GVButton } from "gv-react-components";
import React from "react";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

export const NavigationButton = ({ icon, title, children, onClick }) => {
  return (
    <GVButton className="navigation__button" variant="text" onClick={onClick}>
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </GVButton>
  );
};

const NavigationItem = ({
  href,
  icon,
  title,
  children,
  pathname,
  ...other
}) => {
  return (
    <NavLink
      className="navigation__item"
      activeClassName="navigation__item--active"
      to={{
        pathname: href,
        state: pathname
      }}
      title={title}
      {...other}
    >
      {<icon.type {...icon.props} className="navigation__icon" />}
      <span className="navigation__link">{children}</span>
    </NavLink>
  );
};

const mapStateToProps = state => {
  const { pathname } = state.routing.location;
  return { pathname };
};

export default compose(connect(mapStateToProps))(NavigationItem);
