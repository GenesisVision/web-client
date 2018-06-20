import React from "react";
import { connect } from "react-redux";
import loginService from "../../../login/service/login-service";
import Navigation from "./navigation/navigation";

const NavigationContainer = ({
  className,
  platformData,
  isAuthenticated,
  signOut
}) => {
  return (
    <Navigation
      className={className}
      platformData={platformData}
      isAuthenticated={isAuthenticated}
      signOut={signOut}
    />
  );
};

const mapStateToProps = state => ({
  platformData: state.platformData.settings,
  isAuthenticated: state.authData.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginService.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NavigationContainer);
