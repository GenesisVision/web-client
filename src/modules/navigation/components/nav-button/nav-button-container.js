import React from "react";
import { connect } from "react-redux";

import navigationService from "../../services/navigation-service";
import NavButton from "./nav-button";

const NavButtonContainer = ({ isOpen, toggleNavigationState }) => {
  return (
    <NavButton isOpen={isOpen} toggleNavigationState={toggleNavigationState} />
  );
};

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const mapDispatchToProp = dispatch => ({
  toggleNavigationState: () =>
    dispatch(navigationService.toggleNavigationState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(NavButtonContainer);
