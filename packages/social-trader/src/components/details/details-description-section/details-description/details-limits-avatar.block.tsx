import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import { DETAILS_TYPE } from "components/details/details.types";
import { mediaBreakpointTablet } from "components/gv-styles/gv-media";
import {
  $paddingXsmall,
  $paddingXsmallMobile
} from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";
import { width } from "utils/style/style-mixins";
import { CurrencyEnum } from "utils/types";

interface Props {
  detailsType: DETAILS_TYPE;
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
