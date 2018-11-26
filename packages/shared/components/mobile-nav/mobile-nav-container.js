import { connect } from "react-redux";
import MobileNav from "./mobile-nav";
import { navigationClose } from "../../modules/navigation/actions/navigation-actions";

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
