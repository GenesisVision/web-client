import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import { DetailsLimitsAvatar } from "components/details/details-description-section/details-description/details-limits-avatar.block";
import { DetailsBroker } from "components/details/details-description-section/details-description/details-structure-blocks";
import { DetailsSubtitle } from "components/details/details-description-section/details-description/details-subtitle.block";
import {
    PopoverContent,
    PopoverContentListItem
} from "components/popover/popover-content";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { $dialogBackgroundColor } from "utils/style/colors";
import { mediaBreakpointPhone, mediaBreakpointTablet } from "utils/style/media";
import {
    adaptiveGridGap,
    adaptiveMargin,
    adaptivePadding,
    horizontalPaddings,
    verticalPaddings
} from "utils/style/mixins";
import {
    $paddingMedium,
    $paddingSmall,
    $paddingXsmall
} from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

interface Props {
    AssetDetailsExtraBlock?: React.ComponentType<any>;
    renderFees?: React.ReactNode;
    ownerUrl: string;
    assetLevel?: number;
    assetLogo: string;
    assetOwner: string;
    title: string;
    level?: number;
    brokerLogo?: string;
    brokerName?: string;
    currency: CurrencyEnum;
    totalAvailableInvestment?: number;
    assetColor: string;
    assetLevelProgress?: number;
}

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
  ${mediaBreakpointPhone(`
    padding: 30px 20px;
  `)};
  ${mediaBreakpointTablet(`
    padding: 0px;
  `)};
`;

const FeesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${adaptiveMargin("top", $paddingSmall)};
  ${adaptiveGridGap($paddingSmall, "row")};
`;

const AvatarContainer = styled(RowItem)`
  cursor: pointer;
`;

const AvatarText = styled(RowItem)`
  word-break: break-word;
`;

const _InvestPopupOverviewContainer: React.FC<Props> = ({
    ownerUrl,
    assetLevelProgress,
    assetColor,
    totalAvailableInvestment,
    assetLevel,
    assetLogo,
    assetOwner,
    AssetDetailsExtraBlock,
    renderFees,
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
            {brokerName && (
                <Row size={"large"}>
                    <DetailsBroker logoUrl={brokerLogo!} name={brokerName} />
                </Row>
            )}
            {renderFees && <FeesContainer>{renderFees}</FeesContainer>}
        </Container>
    );
};

const InvestPopupOverviewContainer = React.memo(_InvestPopupOverviewContainer);
export default InvestPopupOverviewContainer;
