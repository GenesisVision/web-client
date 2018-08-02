import { connect } from "react-redux";

import Facets from "./facets";

const mapStateToProps = state => ({
  facets: state.platformData.facets
});

const FacetsContainer = connect(mapStateToProps)(Facets);

export default FacetsContainer;
