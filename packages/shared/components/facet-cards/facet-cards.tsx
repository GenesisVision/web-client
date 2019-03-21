import "./facet-cards.scss";

import { Facet } from "gv-api-web";
import * as React from "react";
import { RefObject } from "react";

import FacetCard from "./facet-card";

interface IFacetCardsProps {
  facets: Facet[];
  composeFacetUrl(url: string): string;
  title: string;
}

class FacetCards extends React.Component<IFacetCardsProps> {
  scroll: RefObject<HTMLDivElement> = React.createRef();
  facetList: RefObject<HTMLDivElement> = React.createRef();

  handleScroll = (): void => {
    this.updateClassList();
  };

  componentDidMount = (): void => {
    this.updateClassList();
  };

  updateClassList = (): void => {
    const node = this.scroll.current;
    const list = this.facetList.current;

    const scrollLeft = node ? node.scrollLeft : 0;
    const scrollWidth = node ? node.scrollWidth : 0;
    const { width = 0 } = node ? node.getBoundingClientRect() : {};

    if (scrollLeft > 0) {
      list && list.classList.add("facets__shadow--left");
    } else if (scrollLeft <= 0) {
      list && list.classList.remove("facets__shadow--left");
    }

    if (scrollWidth - scrollLeft > width) {
      list && list.classList.add("facets__shadow--right");
    } else if (scrollWidth - scrollLeft <= width) {
      list && list.classList.remove("facets__shadow--right");
    }
  };

  render() {
    const { facets, composeFacetUrl, title } = this.props;
    return (
      <div className="facets__wrapper facets__shadow" ref={this.facetList}>
        <div className="facets" ref={this.scroll} onScroll={this.handleScroll}>
          <div className="facets__carousel">
            {facets.map((x: Facet) => (
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

export default FacetCards;
