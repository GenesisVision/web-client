import "components/details/details-description-section/details-description/details-description.scss";

import DetailsDescription from "components/details/details-description-section/details-description/details-description";
import { ToType } from "components/link/link";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

const _DetailsDescriptionSection: React.FC<Props> = ({
  isOwnAsset,
  id,
  title,
  logo,
  color,
  currency,
  ownerUrl,
  socialLinks,
  username,
  asset,
  notificationsUrl,
  settingsUrl,
  programDetails,
  PerformanceData,
  AssetDetailsExtraBlock,
  description,
  Controls
}) => {
  return (
    <div className="details__section asset-details-description">
      <DetailsDescription
        isOwnAsset={isOwnAsset}
        id={id}
        title={title}
        logo={logo}
        color={color}
        currency={currency}
        ownerUrl={ownerUrl}
        socialLinks={socialLinks}
        username={username}
        asset={asset}
        programDetails={programDetails}
        description={description}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
      />
      {PerformanceData && <PerformanceData />}
      {Controls && (
        <div className="asset-details-description__controls">
          <Controls />
        </div>
      )}
    </div>
  );
};

interface Props {
  isOwnAsset: boolean;
  id: string;
  logo: string;
  title: string;
  color?: string;
  currency?: CurrencyEnum;
  ownerUrl?: string;
  username?: string;
  socialLinks?: SocialLinkViewModel[];
  programDetails?: ProgramDetailsFull;
  asset: ASSET;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
  description?: string;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  PerformanceData?: React.ComponentType<any>;
  Controls?: React.ComponentType<any>;
}

const DetailsDescriptionSection = React.memo(_DetailsDescriptionSection);
export default DetailsDescriptionSection;
