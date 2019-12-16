import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import { ToType } from "components/link/link";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

const _DetailsDescription: React.FC<Props> = ({
  isOwnAsset,
  id,
  logo,
  title,
  color,
  currency,
  ownerUrl,
  username,
  socialLinks,
  programDetails,
  asset,
  description,
  AssetDetailsExtraBlock,
  notificationsUrl,
  settingsUrl
}) => {
  return (
    <div className="asset-details-description__main">
      <DetailsLimitsAvatar
        logo={logo}
        level={programDetails ? programDetails.level : undefined}
        levelProgress={
          programDetails ? programDetails.levelProgress : undefined
        }
        title={title}
        color={color}
        totalAvailableInvestment={
          programDetails ? programDetails.totalAvailableInvestment : undefined
        }
        currency={currency}
      />
      <DetailsInfo
        title={title}
        to={ownerUrl ? managerToPathCreator(ownerUrl, title) : undefined}
        username={username}
        socialLinks={socialLinks}
        description={description}
      >
        {AssetDetailsExtraBlock && <AssetDetailsExtraBlock />}
      </DetailsInfo>
      {programDetails && (
        <DetailsSettingsButtons
          isOwnAsset={isOwnAsset}
          asset={asset}
          personalDetails={programDetails.personalDetails}
          id={id}
          notificationsUrl={notificationsUrl}
          settingsUrl={settingsUrl}
        />
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
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  description?: string;
}

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
