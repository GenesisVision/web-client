import ImageBase from "components/avatar/image-base";
import { $paddingControlsLeft } from "components/details/details-description-section/details-description/details-description.style";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapePhone,
  mediaBreakpointTablet
} from "utils/style/media";
import { adaptiveMargin, fontSize } from "utils/style/mixins";
import {
  $fontSizeParagraph,
  $paddingSmall,
  $paddingXsmall
} from "utils/style/sizes";

interface IDetailsStatisticContainerProps {
  isMobileWrap?: boolean;
}

export const DetailsStatisticContainer = styled.div<IDetailsStatisticContainerProps>`
  display: inline-flex;
  box-sizing: border-box;
  flex-grow: 1;
  min-width: 100%;
  ${mediaBreakpointDesktop(`min-width: auto;`)}
  ${({ isMobileWrap }: IDetailsStatisticContainerProps) =>
    isMobileWrap &&
    `
     flex-wrap: wrap;
    ${adaptiveMargin("bottom", -$paddingXsmall)};
     ${mediaBreakpointLandscapePhone(`
      flex-wrap: nowrap;
    `)};
   `};
`;
export const DetailsPerformanceDataContainer = styled.div`
  padding-left: 0;
  ${mediaBreakpointTablet(`
    padding-left: ${$paddingSmall}px;
    margin-left: ${$paddingControlsLeft}px;
  `)}
`;
export const DetailsPerformanceData: React.FC = ({ children }) => (
  <DetailsPerformanceDataContainer>
    <StatisticItemList>{children}</StatisticItemList>
  </DetailsPerformanceDataContainer>
);

const StyledImageBase = styled(ImageBase)`
  width: 100%;
`;

const BrokerImageContainer = styled.div`
  height: 26px;
  width: 100px;
  overflow: hidden;
`;

export const DetailsBroker: React.FC<{
  name?: string;
  logoUrl: string;
}> = React.memo(({ name, logoUrl }) => {
  return (
    <BrokerImageContainer>
      <StyledImageBase alt={name} src={logoUrl} />
    </BrokerImageContainer>
  );
});

const TextContainer = styled(Row)`
  line-height: 2;
  word-break: break-word;
  white-space: pre-wrap;
  ${fontSize($fontSizeParagraph)}
`;

const _DetailsStrategy: React.FC<{
  description: string;
  title?: string;
}> = ({ description, title }) => {
  const [t] = useTranslation();
  const descriptionTitle = title || t("asset-details:description.strategy");
  return (
    <>
      <h4>{descriptionTitle}</h4>
      <TextContainer>
        <Text muted>{description}</Text>
      </TextContainer>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
