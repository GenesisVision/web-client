import FacetCards from "shared/components/facet-cards/facet-cards";
import FacetCardsStub from "shared/components/facet-cards/facet-cards-stub";
import React, { Component } from "react";
import { connect } from "react-redux";
import replaceParams from "shared/utils/replace-params";

import {
  FUNDS_FACET_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "../../../funds.routes";

class FacetCardsContainer extends Component {
  composeFacetUrl = url => {
    return replaceParams(FUNDS_FACET_ROUTE, {
      [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: url
    });
  };
  render() {
    const { isPending, facets, title } = this.props;
    if (!facets || isPending) return <FacetCardsStub />;
    return (
      <FacetCards
        title={title}
        facets={facets}
        composeFacetUrl={this.composeFacetUrl}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.platformData;
  let facets = null;
  if (data) facets = data.fundsFacets;
  return { isPending, facets };
};

export default connect(mapStateToProps)(FacetCardsContainer);
