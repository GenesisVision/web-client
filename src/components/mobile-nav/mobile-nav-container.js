import React from "react";
import { connect } from "react-redux";

import MobileNav from "./mobile-nav";
import { navigationClose } from "../navigation/actions/navigation-actions";

const MobileNavContainer = ({ isOpen, navigationClose }) => {
  return isOpen ? <MobileNav navigationClose={navigationClose} /> : null;
};

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const ConnectedMobileNav = connect(
  mapStateToProps,
  {
    navigationClose
  }
)(MobileNavContainer);

export default ConnectedMobileNav;
