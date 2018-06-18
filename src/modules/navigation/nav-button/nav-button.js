import React from "react";
import PropTypes from "prop-types";
import Button from "../../../components/button/button";
import { connect } from "react-redux";
import { navigationClose, navigationOpen } from "../actions/navigation-actions";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  navigationOpen: PropTypes.func.isRequired,
  navigationClose: PropTypes.func.isRequired
};

function NavButton({ navigationClose, isOpen, navigationOpen, ...props }) {
  const navigationToggle = () =>
    isOpen ? navigationClose() : navigationOpen();
  const Icon = isOpen ? (
    <i className="fas fa-times" />
  ) : (
    <i className="fas fa-bars" />
  );
  return <Button onClick={navigationToggle} icon={Icon} secondary {...props} />;
}

NavButton.propTypes = propTypes;

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const mapDispatchToProp = {
  navigationClose,
  navigationOpen
};

const ConnectedNavButton = connect(
  mapStateToProps,
  mapDispatchToProp
)(NavButton);

export default ConnectedNavButton;
