import ImageBase from "shared/components/avatar/image-base";
import Surface from "shared/components/surface/surface";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import facetImg from "./facet.png";

class FacetCard extends Component {
  facet = React.createRef();
  state = {
    isHovered: false
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { facet, composeFacetUrl, title } = this.props;

    return (
      <Surface
        className={classnames("facet", {
          "facet--hovered": this.state.isHovered
        })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link
          to={{
            pathname: composeFacetUrl(facet.url),
            state: `/ ${title}`
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
  }
}

export const facetShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logo: PropTypes.string
});

FacetCard.propTypes = {
  facet: facetShape
};

export default FacetCard;
