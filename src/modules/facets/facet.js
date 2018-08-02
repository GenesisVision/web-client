import PropTypes from "prop-types";
import React from "react";

const Facet = ({ facet }) => {
  const renderImage = src => {
    if (src === null) return null;
    return <img className="facet__logo" src={src} alt={facet.title} />;
  };
  return (
    <div className="facet">
      <div className="facet__logo-wrapper">{renderImage(facet.logo)}</div>
      <div className="facet__info">
        <div className="facet__title">{facet.title}</div>
        <div className="facet__description">{facet.description}</div>
      </div>
    </div>
  );
};

export const facetShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
});

Facet.propTypes = {
  facet: facetShape
};

export default Facet;
