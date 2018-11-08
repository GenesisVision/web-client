import "./facet-cards.scss";

import PropTypes from "prop-types";
import React from "react";

import FacetCard, { facetShape } from "./facet-card";

const FacetCards = ({ facets, composeFacetUrl, title }) => {
  return (
    <div className="facets-shadow">
      <div className="facets">
        {facets.map(x => (
          <FacetCard
            title={title}
            key={x.id}
            facet={x}
            composeFacetUrl={composeFacetUrl}
          />
        ))}
      </div>
    </div>
  );
};

FacetCards.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default FacetCards;
