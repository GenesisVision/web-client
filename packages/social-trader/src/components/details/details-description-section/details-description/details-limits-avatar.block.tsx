import "./details-description.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import { DETAILS_TYPE } from "components/details/details.types";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const _DetailsLimitsAvatar: React.FC<Props> = props => {
  const { detailsType, logo, title } = props;
  return (
    <div className="details-description__avatar">
      {detailsType === DETAILS_TYPE.ASSET ? (
        <DetailsAssetAvatar {...props} />
      ) : (
        <ProfileAvatar big url={logo} alt={title} />
      )}
    </div>
  );
};

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

export const DetailsLimitsAvatar = React.memo(_DetailsLimitsAvatar);
