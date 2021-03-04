import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { DetailsBroker } from "components/details/details-description-section/details-description/details-structure-blocks";
import { DetailsSubtitle } from "components/details/details-description-section/details-description/details-subtitle.block";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { $investPopupBackground } from "utils/style/colors";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";
import {
  adaptiveFullPadding,
  adaptiveGridGap,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/mixins";
import {
  $paddingMedium,
  $paddingSmall,
  $paddingUpperMedium
} from "utils/style/sizes";

interface Props {
  ownerUrl: string;
  assetOwner: string;
  assetLogo: string;
  assetColor: string;
  title: string;
  form: JSX.Element;
  popupTop: JSX.Element;
  assetLevel?: number;
  assetLevelProgress?: number;
  brokerLogo?: string;
  brokerName?: string;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  AssetFeesBlock?: React.ComponentType<any>;
}

const Container = styled.div`
  ${mediaBreakpointLandscapePhone(`
  width: 480px;
`)}
  ${mediaBreakpointTablet(`
  width: 650px;
`)}
${mediaBreakpointLandscapeTablet(`
  width: 750px;
`)}
`;

const MainContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  background-color: ${$investPopupBackground};
  ${mediaBreakpointTablet(`
    grid-template-columns: 1fr minmax(50%,1fr);
    column-gap: 30px;
    ${adaptiveFullPadding($paddingSmall)};
  `)}
`;

const FormContainer = styled.div`
  background: #202a34;
  ${mediaBreakpointTablet(`
    border-radius: 8px;
  `)}
  ${verticalPaddings($paddingUpperMedium)};
  ${horizontalPaddings($paddingSmall)};
`;

const InfoBlock = styled.div`
  ${horizontalPaddings($paddingSmall)}
  padding-top: ${$paddingSmall}px;
  padding-bottom: ${$paddingMedium}px;
  ${mediaBreakpointTablet(`
    padding: 0px;
  `)};
`;

const FeesContainer = styled(Row)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${adaptiveGridGap($paddingSmall, "row")};
`;

const AvatarContainer = styled(RowItem)`
  cursor: pointer;
`;

const AvatarText = styled(RowItem)`
  word-break: break-word;
`;

const _InvestDefaultPopup: React.FC<Props> = ({
  ownerUrl,
  assetColor,
  assetLevelProgress,
  assetLevel,
  assetLogo,
  form,
  AssetDetailsExtraBlock,
  AssetFeesBlock,
  brokerName,
  brokerLogo,
  title,
  assetOwner,
  popupTop
}) => {
  return (
    <Container>
      {popupTop}
      <MainContentContainer>
        <InfoBlock>
          <Row>
            <AvatarContainer size={"xlarge"}>
              <AssetAvatar
                levelColor={"#131e26"}
                url={assetLogo}
                level={assetLevel}
                levelProgress={assetLevelProgress}
                alt={title}
                color={assetColor}
                size={"middle"}
                tooltip={
                  assetLevel ? (
                    <LevelTooltip level={assetLevel} canLevelUp={false} />
                  ) : undefined
                }
              />
            </AvatarContainer>
            <AvatarText>
              <Text weight={"bold"} size={"large"}>
                {title}
              </Text>
              <Row>
                <DetailsSubtitle
                  to={managerToPathCreator(ownerUrl, title)}
                  text={assetOwner}
                />
              </Row>
            </AvatarText>
          </Row>
          <Row size={"large"}>
            <RowItem>
              {AssetDetailsExtraBlock && <AssetDetailsExtraBlock />}
            </RowItem>
          </Row>
          {brokerName && brokerLogo && (
            <Row size={"large"}>
              <DetailsBroker logoUrl={brokerLogo} name={brokerName} />
            </Row>
          )}
          {AssetFeesBlock && (
            <FeesContainer size={"large"}>{<AssetFeesBlock />}</FeesContainer>
          )}
        </InfoBlock>
        <FormContainer>{form}</FormContainer>
      </MainContentContainer>
    </Container>
  );
};

const InvestDefaultPopup = React.memo(_InvestDefaultPopup);
export default InvestDefaultPopup;
