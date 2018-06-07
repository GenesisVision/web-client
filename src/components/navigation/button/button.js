import React from "react";
import PropTypes from "prop-types";
import Button from "../../button/button";
import { MenuIcon, CloseIcon } from "../media/icons";
import { connect } from "react-redux";
import { navigationClose, navigationOpen } from "../actions/navigation-actions";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  navigationToggle: PropTypes.func.isRequired
};

function NavButton({ navigationClose, isOpen, navigationOpen }) {
  const navigationToggle = () =>
    isOpen ? navigationClose() : navigationOpen();
  const Icon = isOpen ? CloseIcon : MenuIcon;
  return <Button onClick={navigationToggle} icon={<Icon />} secondary />;
}

NavButton.propTypes = propTypes;

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const mapDispatchToProp = {
  navigationClose,
  navigationOpen
};

const ConnectedNavButton = connect(mapStateToProps, mapDispatchToProp)(
  NavButton
);

export default ConnectedNavButton;
