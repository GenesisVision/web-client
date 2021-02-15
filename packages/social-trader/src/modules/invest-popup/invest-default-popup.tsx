import React from "react";
import styled from "styled-components";
import { $investPopupBackground } from "utils/style/colors";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";
import {
  adaptiveFullPadding,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/mixins";
import { $paddingSmall, $paddingUpperMedium } from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

import InvestPopupInfo from "./invest-popup-info";

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
  totalAvailableInvestment?: number;
  currency?: CurrencyEnum;
}

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

const _InvestDefaultPopup: React.FC<Props> = ({
  ownerUrl,
  totalAvailableInvestment,
  assetColor,
  assetLevelProgress,
  assetLevel,
  assetLogo,
  form,
  AssetDetailsExtraBlock,
  AssetFeesBlock,
  brokerName,
  brokerLogo,
  currency,
  title,
  assetOwner,
  popupTop
}) => {
  return (
    <Container>
      {popupTop}
      <MainContentContainer>
        <InvestPopupInfo
          ownerUrl={ownerUrl}
          totalAvailableInvestment={totalAvailableInvestment}
          assetColor={assetColor}
          assetLevelProgress={assetLevelProgress}
          assetLevel={assetLevel}
          assetLogo={assetLogo}
          currency={currency!}
          AssetFeesBlock={AssetFeesBlock}
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

const InvestDefaultPopup = React.memo(_InvestDefaultPopup);
export default InvestDefaultPopup;
