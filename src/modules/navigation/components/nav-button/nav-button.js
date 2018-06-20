import classnames from "classnames";
import Button from "components/button/button";
import PropTypes from "prop-types";
import React from "react";

const NavButton = ({ isOpen, toggleNavigationState, className }) => {
  return (
    <Button
      className="header__button"
      onClick={toggleNavigationState}
      icon={
        <i className={classnames("fas", isOpen ? "fa-times" : "fa-bars")} />
      }
      secondary
    />
  );
};

NavButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNavigationState: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default NavButton;
