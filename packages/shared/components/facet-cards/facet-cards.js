import "./facet-cards.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import FacetCard, { facetShape } from "./facet-card";

class FacetCards extends Component {
  scroll = React.createRef();
  facetList = React.createRef();

  handleScroll = () => {
    this.updateClassList();
  };

  componentDidMount() {
    this.updateClassList();
  }

  updateClassList = () => {
    const node = this.scroll.current;
    const list = this.facetList.current;

    const scrollLeft = node.scrollLeft;
    const scrollWidth = node.scrollWidth;
    const { width } = node.getBoundingClientRect();

    if (scrollLeft > 0) {
      list.classList.add("facets__shadow--left");
    } else if (scrollLeft <= 0) {
      list.classList.remove("facets__shadow--left");
    }

    if (scrollWidth - scrollLeft > width) {
      list.classList.add("facets__shadow--right");
    } else if (scrollWidth - scrollLeft <= width) {
      list.classList.remove("facets__shadow--right");
    }
  };

  render() {
    const { facets, composeFacetUrl, title } = this.props;
    return (
      <div className="facets__wrapper facets__shadow" ref={this.facetList}>
        <div className="facets" ref={this.scroll} onScroll={this.handleScroll}>
          <div className="facets__carousel">
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
      </div>
    );
  }
}

FacetCards.propTypes = {
  facet: PropTypes.arrayOf(facetShape)
};

export default FacetCards;
