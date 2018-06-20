import React from "react";
import { connect } from "react-redux";
import NavButton from "./nav-button";
import navigationService from "../../services/navigation-service";

const NavButtonContainer = ({ isOpen, toggleNavigationState, className }) => {
  return (
    <NavButton
      isOpen={isOpen}
      toggleNavigationState={toggleNavigationState}
      className={className}
    />
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
