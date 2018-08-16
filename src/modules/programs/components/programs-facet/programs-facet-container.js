import NotFoundPage from "pages/not-found/not-found.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { getCurrentFacet } from "../../services/programs-service";
import ProgramsFacet from "./programs-facet";
import ProgramsFacetStub from "./programs-facet-stub";

class ProgramsFacetContainer extends Component {
  render() {
    const { facetData, goBack } = this.props;
    if (facetData.isPending) return <ProgramsFacetStub />;
    if (facetData.notFound) return <NotFoundPage />;
    return <ProgramsFacet facet={facetData.facet} goBack={goBack} />;
  }
}

const mapStateToProps = state => {
  const { data } = state.platformData;
  let facets = null;
  if (data) facets = data.facets;
  return { facets };
};

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  service: bindActionCreators({ getCurrentFacet }, dispatch)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const facetData = dispatchProps.service.getCurrentFacet();
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    facetData
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(ProgramsFacetContainer);
