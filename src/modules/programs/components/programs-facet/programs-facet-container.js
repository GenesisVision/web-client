import { connect } from "react-redux";
import { goBack } from "react-router-redux";

import ProgramsFacet from "./programs-facet";

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack())
});

const ProgramsFacetContainer = connect(
  null,
  mapDispatchToProps
)(ProgramsFacet);

export default ProgramsFacetContainer;
