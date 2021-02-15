import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import { DetailsBroker } from "components/details/details-description-section/details-description/details-structure-blocks";
import { DetailsSubtitle } from "components/details/details-description-section/details-description/details-subtitle.block";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";
import { adaptiveGridGap, horizontalPaddings } from "utils/style/mixins";
import { $paddingMedium, $paddingSmall } from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

interface Props {
    ownerUrl: string;
    assetOwner: string;
    assetLogo: string;
    assetColor: string;
    currency: CurrencyEnum;
    title: string;
    AssetDetailsExtraBlock?: React.ComponentType<any>;
    AssetFeesBlock?: React.ComponentType<any>;
    assetLevel?: number;
    assetLevelProgress?: number;
    level?: number;
    brokerLogo?: string;
    brokerName?: string;
    totalAvailableInvestment?: number;
}

const Container = styled.div`
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

const _InvestPopupInfo: React.FC<Props> = ({
    ownerUrl,
    assetLevelProgress,
    assetColor,
    totalAvailableInvestment,
    assetLevel,
    assetLogo,
    assetOwner,
    AssetDetailsExtraBlock,
    AssetFeesBlock,
    brokerLogo,
    currency,
    brokerName,
    title
}) => {
    return (
        <Container>
            <Row>
                <AvatarContainer size={"xlarge"}>
                    <DetailsAssetAvatar
                        logo={assetLogo}
                        title={title}
                        color={assetColor}
                        currency={currency}
                        level={assetLevel}
                        levelProgress={assetLevelProgress}
                        totalAvailableInvestment={totalAvailableInvestment}
                        size={"middle"}
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
        </Container>
    );
};

const InvestPopupInfo = React.memo(_InvestPopupInfo);
export default InvestPopupInfo;
