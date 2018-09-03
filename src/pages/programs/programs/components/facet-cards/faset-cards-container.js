import React, { Component } from "react";
import { connect } from "react-redux";

import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

class FacetCardsContainer extends Component {
  render() {
    const { isPending, facets } = this.props;
    if (!facets) return null;
    if (isPending) return <FacetCardsStub />;
    return <FacetCards facets={facets} />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.platformData;
  let facets = null;
  if (data) facets = data.facets;
  return { isPending, facets };
};

export default connect(mapStateToProps)(FacetCardsContainer);
