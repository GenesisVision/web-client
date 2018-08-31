import "./facet-cards.scss";

import PropTypes from "prop-types";
import React from "react";

import FacetCard, { facetShape } from "./facet-card";

const FacetCards = ({ facets }) => {
  return (
    <div className="facets">
      {facets.map(x => (
        <FacetCard key={x.id} facet={x} />
      ))}
    </div>
  );
};

FacetCards.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default FacetCards;
