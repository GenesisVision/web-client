import "./facets.scss";

import PropTypes from "prop-types";
import React from "react";

import Facet, { facetShape } from "./facet";

const Facets = ({ facets }) => {
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
      logo: null
    }
  ];
  if (facets.length === 0) return null;
  return (
    <div className="facets">
      {facets.map(x => <Facet key={x.id} facet={x} />)}
    </div>
  );
};

Facets.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default Facets;
