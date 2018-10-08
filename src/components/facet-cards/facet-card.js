import Surface from "components/surface/surface";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import facetImg from "./facet.png";

const FacetCard = ({ facet, composeFacetUrl }) => {
  const renderImage = src => {
    if (src === null) return null;
    return <img className="facet__logo" src={facetImg} alt={facet.title} />;
  };

  return (
    <Surface className="facet">
      <Link to={composeFacetUrl(facet.url)}>
        <div className="facet__facet-container">
          <div className="facet__logo-wrapper">{renderImage(facet.logo)}</div>
          <div className="facet__info">
            <div className="facet__title">{facet.title}</div>
            <div className="facet__description">{facet.description}</div>
          </div>
        </div>
      </Link>
    </Surface>
  );
};

export const facetShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
});

FacetCard.propTypes = {
  facet: facetShape
};

export default FacetCard;
