import DepositTop, {
    DepositTopOwnProps
} from "components/deposit/components/deposit-top";
import { Row } from "components/row/row";
import React from "react";
import styled from "styled-components";
import { $dialogBackgroundColor } from "utils/style/colors";
import {
    mediaBreakpointLandscapePhone,
    mediaBreakpointLandscapeTablet,
    mediaBreakpointPhone,
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

import InvestPopupOverviewContainer from "./invest-popup-overview-container";

interface Props extends DepositTopOwnProps {
    ownerUrl: string;
    assetLogo: string;
    title: string;
    assetLevel?: number;
    form: React.ComponentType<any>;
    assetOwner: string;
    brokerLogo?: string;
    brokerName?: string;
    AssetDetailsExtraBlock?: React.ComponentType<any>;
    renderFees?: React.ReactNode;
    totalAvailableInvestment?: number;
    assetColor: string;
    assetLevelProgress?: number;
}

const MainContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  background-color: ${$dialogBackgroundColor};
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

const Container = styled.div`
  /* ${mediaBreakpointPhone(`
  max-width: 480px;
`)} */
  ${mediaBreakpointLandscapePhone(`
  max-width: 480px;
`)}
  ${mediaBreakpointTablet(`
  max-width: 650px;
`)}
${mediaBreakpointLandscapeTablet(`
  max-width: 750px;
`)}
`;

const _InvestDefaultPopupContainer: React.FC<Props> = ({
    ownerUrl,
    totalAvailableInvestment,
    assetColor,
    assetLevelProgress,
    assetLevel,
    assetLogo,
    form,
    AssetDetailsExtraBlock,
    renderFees,
    brokerName,
    brokerLogo,
    asset,
    availableToInvest,
    currency,
    title,
    header,
    assetOwner,
    ownAsset
}) => {
    return (
        <Container>
            <DepositTop
                asset={asset}
                availableToInvest={availableToInvest}
                currency={currency}
                title={title}
                header={header}
                ownAsset={ownAsset}
            />
            <MainContentContainer>
                <InvestPopupOverviewContainer
                    ownerUrl={ownerUrl}
                    totalAvailableInvestment={totalAvailableInvestment}
                    assetColor={assetColor}
                    assetLevelProgress={assetLevelProgress}
                    assetLevel={assetLevel}
                    assetLogo={assetLogo}
                    currency={currency!}
                    renderFees={renderFees}
                    AssetDetailsExtraBlock={AssetDetailsExtraBlock}
                    brokerLogo={brokerLogo}
                    brokerName={brokerName}
                    assetOwner={assetOwner}
                    title={title}
                />
                <FormContainer>{form}</FormContainer>
            </MainContentContainer>
        </Container>
    );
};

const InvestDefaultPopupContainer = React.memo(_InvestDefaultPopupContainer);
export default InvestDefaultPopupContainer;
