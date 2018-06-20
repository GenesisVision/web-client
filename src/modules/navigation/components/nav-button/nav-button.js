import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "components/button/button";

const NavButton = ({ isOpen, toggleNavigationState, className }) => {
  return (
    <Button
      onClick={toggleNavigationState}
      icon={
        <i className={classnames("fas", isOpen ? "fa-times" : "fa-bars")} />
      }
      secondary
      className={className}
    />
  );
};

NavButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNavigationState: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default NavButton;
