import ImageBase from "components/avatar/image-base";
import { DefaultBlock } from "components/default.block/default.block";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { AssetFacet } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";
import { $primaryColor } from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapePhone
} from "utils/style/media";
import { transition } from "utils/style/mixins";
import { $boxShadow1, $boxShadow4 } from "utils/style/shadow";
import { $paddingSmall } from "utils/style/sizes";

import facetImg from "./facet.png";

interface Props {
  title: string;
  facet: AssetFacet;
  composeFacetUrl: composeFacetUrlFunc;
  fileRoute: string;
}

export type composeFacetUrlFunc = (url: string) => string;

export const $facetTranslateSize = 10;
const $facetWidth = 315;
const $facetHeight = 280;

const StyledDefaultBlock = styled(DefaultBlock)`
  ${transition("transform", "box-shadow")};
  display: inline-block;
  height: ${$facetHeight / 1.5}px;
  min-width: ${$facetWidth / 1.5}px;
  overflow: hidden;
  box-shadow: ${$boxShadow1};

  &:hover {
    transform: translateY(-${$facetTranslateSize});
    box-shadow: ${$boxShadow4};
  }

  ${mediaBreakpointDesktop(`min-width: auto;`)}
  ${mediaBreakpointLandscapePhone(
    `min-width: ${$facetWidth}px; height: ${$facetHeight}px;`
  )}
`;

const Container = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  height: 65%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Logo = styled(ImageBase)`
  width: 100%;
  max-width: 315px;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${$paddingSmall / 2}px;
  ${mediaBreakpointLandscapePhone(`padding: ${$paddingSmall}px;`)}
`;

const Title = styled.h2`
  font-weight: 400;
`;

const Description = styled(Text)`
  letter-spacing: 0.2px;
`;

const _FacetCard: React.FC<Props> = ({
  facet,
  composeFacetUrl,
  title,
  fileRoute
}) => {
  const { linkCreator } = useToLink();
  return (
    <StyledDefaultBlock solid horizontalOffsets={false} verticalOffsets={false}>
      <Link to={linkCreator(composeFacetUrl(facet.url), fileRoute, title)}>
        <Container>
          <LogoWrapper>
            <Logo
              quality={"Medium"}
              src={facet.logoUrl}
              alt={facet.title}
              defaultImage={facetImg}
            />
          </LogoWrapper>
          <Info>
            <Title>{facet.title}</Title>
            <Row size={"small"}>
              <Description sizeValue={"14"} color={$primaryColor}>
                {facet.description}
              </Description>
            </Row>
          </Info>
        </Container>
      </Link>
    </StyledDefaultBlock>
  );
};

const FacetCard = React.memo(_FacetCard);
export default FacetCard;
