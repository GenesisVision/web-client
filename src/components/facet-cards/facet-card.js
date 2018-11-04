import ImageBase from "components/avatar/image-base";
import Surface from "components/surface/surface";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import facetImg from "./facet.png";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";

const FacetCard = ({ facet, composeFacetUrl, pathname }) => {
  return (
    <Surface className="facet">
      <Link
        to={{
          pathname: composeFacetUrl(facet.url),
          state: pathname
        }}
      >
        <div className="facet__facet-container">
          <ImageBase
            url={facet.logo}
            alt={facet.title}
            defaultImage={facetImg}
            className="facet__logo-wrapper"
            imageClassName="facet__logo"
          />
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
  logo: PropTypes.string
});

FacetCard.propTypes = {
  facet: facetShape
};

const mapStateToProps = state => {
  const { pathname } = state.routing.location;
  return { pathname };
};

export default compose(connect(mapStateToProps))(FacetCard);
