import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import {
  DETAILS_TYPE,
  PersonalDetailsType
} from "components/details/details.types";
import { ToType } from "components/link/link";
import { ASSET } from "constants/constants";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { CurrencyEnum } from "utils/types";

import styles from "./details-description.module.scss";
import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

interface Props {
  descriptionTitle?: string;
  detailsType: DETAILS_TYPE;
  personalDetails?: PersonalDetailsType;
  isOwnAsset?: boolean;
  id: string;
  logo: string;
  title: string;
  color?: string;
  currency?: CurrencyEnum;
  subtitleUrl?: string;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  programDetails?: ProgramDetailsFull;
  asset?: ASSET;
  systemUrl?: string;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  description?: string;
}

const _DetailsDescription: React.FC<Props> = ({
  descriptionTitle,
  detailsType,
  personalDetails,
  isOwnAsset,
  id,
  logo,
  title,
  color,
  currency,
  subtitleUrl,
  subtitle,
  socialLinks,
  programDetails,
  asset,
  description,
  AssetDetailsExtraBlock,
  systemUrl,
  notificationsUrl,
  settingsUrl
}) => {
  return (
    <div className={styles["details-description__main"]}>
      <DetailsLimitsAvatar
        detailsType={detailsType}
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
        descriptionTitle={descriptionTitle}
        title={title}
        subtitleUrl={
          subtitleUrl ? managerToPathCreator(subtitleUrl, title) : undefined
        }
        subtitle={subtitle}
        socialLinks={socialLinks}
        description={description}
      >
        {AssetDetailsExtraBlock && <AssetDetailsExtraBlock />}
      </DetailsInfo>
      {personalDetails && (
        <DetailsSettingsButtons
          isOwnAsset={isOwnAsset}
          asset={asset}
          personalDetails={personalDetails}
          id={id}
          systemUrl={systemUrl}
          notificationsUrl={notificationsUrl}
          settingsUrl={settingsUrl}
        />
      )}
    </div>
  );
};

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
