import { connect } from "react-redux";

import { navigationClose } from "../../modules/navigation/actions/navigation-actions";
import MobileNav from "./mobile-nav";

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const mapDispatchToProps = {
  navigationClose
};

const MobileNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNav);

export default MobileNavContainer;
