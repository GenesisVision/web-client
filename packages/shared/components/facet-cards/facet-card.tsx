import classNames from "classnames";
import { Facet } from "gv-api-web";
import * as React from "react";
import { Link } from "react-router-dom";
import ImageBase from "shared/components/avatar/image-base";
import Surface from "shared/components/surface/surface";

import facetImg from "./facet.png";

interface IFacetCardProps {
  title: string;
  facet: Facet;
  composeFacetUrl(url: string): string;
}

interface IFacetCardState {
  isHovered: boolean;
}

class FacetCard extends React.Component<IFacetCardProps, IFacetCardState> {
  state = {
    isHovered: false
  };

  handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  render() {
    const { facet, composeFacetUrl, title } = this.props;
    return (
      <Surface
        className={classNames("surface--without-paddings facet", {
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
              <h2 className="facet__title">{facet.title}</h2>
              <div className="facet__description">{facet.description}</div>
            </div>
          </div>
        </Link>
      </Surface>
    );
  }
}

export default FacetCard;
