import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import { DefaultBlock } from "components/default.block/default.block";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { AssetFacet } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";

import styles from "./facet-cards.module.scss";
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
    <DefaultBlock
      solid
      horizontalOffsets={false}
      verticalOffsets={false}
      className={classNames(styles["facet"], {
        [styles["facet--hovered"]]: isHovered
      })}
      onMouseEnter={setHovered}
      onMouseLeave={setNotHovered}
    >
      <Link to={linkCreator(composeFacetUrl(facet.url), fileRoute, title)}>
        <div className={styles["facet__facet-container"]}>
          <div className={styles["facet__logo-wrapper"]}>
            <ImageBase
              quality={"Medium"}
              src={facet.logoUrl}
              alt={facet.title}
              defaultImage={facetImg}
              className={styles["facet__logo"]}
            />
          </div>
          <div className={styles["facet__info"]}>
            <h2 className={styles["facet__title"]}>{facet.title}</h2>
            <Row small className={styles["facet__description"]}>
              {facet.description}
            </Row>
          </div>
        </div>
      </Link>
    </DefaultBlock>
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
