import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FacetCard = ({ facet, onSelectFacet }) => {
  const renderImage = src => {
    if (src === null) return null;
    return <img className="facet__logo" src={src} alt={facet.title} />;
  };

  const handleClick = e => {
    e.preventDefault();
    onSelectFacet(facet.id);
  };

  return (
    <Link
      className="facet"
      to={`/programs/facet/${facet.id}`}
      onClick={handleClick}
    >
      <div className="facet__logo-wrapper">{renderImage(facet.logo)}</div>
      <div className="facet__info">
        <div className="facet__title">{facet.title}</div>
        <div className="facet__description">{facet.description}</div>
      </div>
    </Link>
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
