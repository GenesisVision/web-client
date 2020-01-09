import "./details-description.scss";

import { DETAILS_TYPE } from "components/details/details.types";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const DetailsAssetAvatar = dynamic(() =>
  import(
    "components/details/details-description-section/details-description/details-asset-avatar"
  )
);
const ProfileAvatar = dynamic(() =>
  import("components/avatar/profile-avatar/profile-avatar")
);

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
