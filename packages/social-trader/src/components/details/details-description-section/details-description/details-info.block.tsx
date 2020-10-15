import { $paddingInfoLeft } from "components/details/details-description-section/details-description/details-description.style";
import { DetailsStrategy } from "components/details/details-description-section/details-description/details-structure-blocks";
import { ToType } from "components/link/link";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";

import { DetailsSubtitle } from "./details-subtitle.block";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  descriptionTitle?: string;
  title: string;
  subtitleUrl?: ToType;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  description?: string;
}

const InfoContainer = styled.div`
  order: 99;
  width: 100%;
  ${mediaBreakpointTablet(`
    order: 0;
    width: auto;
    margin-left: ${$paddingInfoLeft}px;
  `)}
`;

const _DetailsInfo: React.FC<Props> = ({
  descriptionTitle,
  title,
  subtitleUrl,
  subtitle,
  socialLinks,
  description,
  children
}) => {
  return (
    <InfoContainer>
      <h1>{title}</h1>
      {subtitle && (
        <Row>
          <DetailsSubtitle to={subtitleUrl} text={subtitle} />
        </Row>
      )}
      {socialLinks && (
        <Row>
          <SocialLinksBlock socialLinks={socialLinks} />
        </Row>
      )}
      {children && <Row onlyOffset>{children}</Row>}
      {description && (
        <Row size={"xlarge"} onlyOffset>
          <DetailsStrategy title={descriptionTitle} description={description} />
        </Row>
      )}
    </InfoContainer>
  );
};

export const DetailsInfo = React.memo(_DetailsInfo);
