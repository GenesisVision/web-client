import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import { RowItem } from "components/row-item/row-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetFacet } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { adaptiveMargin } from "utils/style/mixins";
import { $paddingSmall } from "utils/style/sizes";

import FacetCard, {
  $facetTranslateSize,
  composeFacetUrlFunc
} from "./facet-card";

interface Props {
  data: Array<AssetFacet>;
  composeFacetUrl: composeFacetUrlFunc;
  title: string;
  fileRoute: string;
}

const Wrapper = styled.div`
  ${adaptiveMargin("bottom", $paddingSmall)}
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-top: ${$facetTranslateSize}px;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & {
    -ms-overflow-style: none;
  }
`;

const _FacetCards: React.FC<Props> = ({
  data,
  composeFacetUrl,
  title,
  fileRoute
}) => {
  const [load, setLoad] = useIsOpen();
  const { scrollData, ref, handleScroll } = useShadow();
  const handleLoad = useCallback(() => {
    if (!ref.current) return;
    if (!load) {
      setLoad();
      ref.current.scrollTo(5, 0);
    }
  }, [load]);
  return (
    <Wrapper>
      <HorizontalListShadowContainer darkShadow scrollData={scrollData}>
        <Carousel ref={ref} onLoad={handleLoad} onScroll={handleScroll}>
          {data.map(facet => (
            <RowItem size={"large"} key={facet.id}>
              <FacetCard
                title={title}
                fileRoute={fileRoute}
                facet={facet}
                composeFacetUrl={composeFacetUrl}
              />
            </RowItem>
          ))}
        </Carousel>
      </HorizontalListShadowContainer>
    </Wrapper>
  );
};

const FacetCards = withBlurLoader(React.memo(_FacetCards));
export default FacetCards;
