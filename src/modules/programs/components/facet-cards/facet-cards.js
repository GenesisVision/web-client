import "./facet-cards.scss";

import PropTypes from "prop-types";
import React from "react";

import FacetCard, { facetShape } from "./facet-card";

const FacetCards = ({ facets, changeFacet }) => {
  facets = [
    {
      id: "1",
      title: "title",
      description: "description",
      logo: "http://via.placeholder.com/315x140"
    },
    {
      id: "2",
      title: "title 2",
      description: "description 2",
      logo: "http://via.placeholder.com/315x140"
    },
    {
      id: "3",
      title: "title 3",
      description: "description 3",
      logo: "http://via.placeholder.com/315x140"
    },
    {
      id: "4",
      title: "title 4",
      description: "description 4",
      logo: "http://via.placeholder.com/315x140"
    }
  ];
  if (facets.length === 0) return null;
  return (
    <div className="facets">
      {facets.map(x => (
        <FacetCard key={x.id} facet={x} onSelectFacet={changeFacet} />
      ))}
    </div>
  );
};

FacetCards.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default FacetCards;
