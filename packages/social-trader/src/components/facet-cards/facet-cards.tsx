import "./facet-cards.scss";

import { AssetFacet } from "gv-api-web";
import * as React from "react";
import { RefObject } from "react";

import FacetCard, { composeFacetUrlFunc } from "./facet-card";

class _FacetCards extends React.PureComponent<Props> {
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
    const { facets, composeFacetUrl, title, fileRoute } = this.props;
    return (
      <div className="facets__wrapper facets__shadow" ref={this.facetList}>
        <div className="facets" ref={this.scroll} onScroll={this.handleScroll}>
          <div className="facets__carousel">
            {facets.map(x => (
              <FacetCard
                title={title}
                fileRoute={fileRoute}
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

interface Props {
  facets: Array<AssetFacet>;
  composeFacetUrl: composeFacetUrlFunc;
  title: string;
  fileRoute: string;
}

const FacetCards = _FacetCards;
export default FacetCards;
