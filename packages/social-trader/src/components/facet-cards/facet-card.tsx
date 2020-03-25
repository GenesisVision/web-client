import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import Surface from "components/surface/surface";
import { AssetFacet } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";

import facetImg from "./facet.png";

const _FacetCard: React.FC<Props> = ({
  facet,
  composeFacetUrl,
  title,
  fileRoute
}) => {
  const { linkCreator } = useToLink();
  const [isHovered, setHovered, setNotHovered] = useIsOpen();
  return (
    <Surface
      className={classNames("surface--without-paddings facet", {
        "facet--hovered": isHovered
      })}
      onMouseEnter={setHovered}
      onMouseLeave={setNotHovered}
    >
      <Link to={linkCreator(composeFacetUrl(facet.url), fileRoute, title)}>
        <div className="facet__facet-container">
          <div className="facet__logo-wrapper">
            <ImageBase
              quality={"Medium"}
              src={facet.logo}
              alt={facet.title}
              defaultImage={facetImg}
              className="facet__logo"
            />
          </div>
          <div className="facet__info">
            <h2 className="facet__title">{facet.title}</h2>
            <Row small className="facet__description">
              {facet.description}
            </Row>
          </div>
        </div>
      </Link>
    </Surface>
  );
};

interface Props {
  title: string;
  facet: AssetFacet;
  composeFacetUrl: composeFacetUrlFunc;
  fileRoute: string;
}

export type composeFacetUrlFunc = (url: string) => string;

const FacetCard = React.memo(_FacetCard);
export default FacetCard;
