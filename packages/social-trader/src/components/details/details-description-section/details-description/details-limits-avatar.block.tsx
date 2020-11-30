import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import * as React from "react";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";
import { width } from "utils/style/mixins";
import { $paddingXsmall, $paddingXsmallMobile } from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

interface Props {
  logo: string;
  title: string;
  color?: string;
  level?: number;
  levelProgress?: number;
  totalAvailableInvestment?: number;
  currency?: CurrencyEnum;
}

const AvatarContainer = styled.div`
  cursor: pointer;
  margin: ${$paddingXsmallMobile}px 0 ${$paddingXsmall}px;
  ${width(120)}
  ${mediaBreakpointTablet("padding: 0;")}
`;

const _DetailsLimitsAvatar: React.FC<Props> = props => {
  return (
    <AvatarContainer>
      <DetailsAssetAvatar {...props} />
    </AvatarContainer>
  );
};

export const DetailsLimitsAvatar = React.memo(_DetailsLimitsAvatar);
