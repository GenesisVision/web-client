import React, { Component } from "react";
import { connect } from "react-redux";

import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

class FacetCardsContainer extends Component {
  render() {
    const {
      isPending,
      facets,
      title,
      composeFacetUrl,
      PROGRAMS_RATING_ROUTE
    } = this.props;
    if (!facets || isPending) return <FacetCardsStub />;
    return (
      <FacetCards
        title={title}
        facets={facets}
        composeFacetUrl={composeFacetUrl}
        PROGRAMS_RATING_ROUTE={PROGRAMS_RATING_ROUTE}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { isPending, data } = state.platformData;
  let facets = null;
  if (data) facets = data[props.assetsFacets];
  return { isPending, facets };
};

export default connect(mapStateToProps)(FacetCardsContainer);
