import "./facet-cards.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import FacetCard, { facetShape } from "./facet-card";

class FacetCards extends Component {
  handleScroll = event => {
    const scrollLeft = event.currentTarget.scrollLeft;
    const scrollWidth = event.currentTarget.scrollWidth;
    const { width } = this.fac.getBoundingClientRect();

    if (scrollLeft > 0 && !this.fs.classList.contains("facets__shadow--left")) {
      this.fs.classList.add("facets__shadow--left");
    } else if (scrollLeft <= 0) {
      this.fs.classList.remove("facets__shadow--left");
    }

    if (
      scrollWidth - scrollLeft > width &&
      !this.fs.classList.contains("facets__shadow--right")
    ) {
      this.fs.classList.add("facets__shadow--right");
    } else if (scrollWidth - scrollLeft <= width) {
      this.fs.classList.remove("facets__shadow--right");
    }
  };

  componentDidMount() {
    const { width: carouselWidth } = this.carousel.getBoundingClientRect();
    const { width } = this.fac.getBoundingClientRect();
    if (
      carouselWidth > width &&
      !this.fs.classList.contains("facets__shadow--right")
    ) {
      this.fs.classList.add("facets__shadow--right");
    }
  }

  render() {
    const { facets, composeFacetUrl } = this.props;
    return (
      <div
        className="facets__wrapper facets__shadow"
        ref={fs => (this.fs = fs)}
      >
        <div
          className="facets"
          ref={fac => (this.fac = fac)}
          onScroll={this.handleScroll}
        >
          <div
            className="facets__carousel"
            ref={carousel => (this.carousel = carousel)}
          >
            {facets.map(x => (
              <FacetCard
                key={x.id}
                facet={x}
                composeFacetUrl={composeFacetUrl}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

FacetCards.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default FacetCards;
