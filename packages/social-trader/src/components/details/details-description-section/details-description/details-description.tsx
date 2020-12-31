import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import { PersonalDetailsType } from "components/details/details.types";
import { ToType } from "components/link/link";
import { ASSET } from "constants/constants";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";
import { CurrencyEnum } from "utils/types";

import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mediaBreakpointTablet(`
    flex-wrap: nowrap;
    justify-content: flex-start;
  `)}
`;

interface Props {
  descriptionTitle?: string;
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
  apiKeysUrl?: ToType;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  description?: string;
}

const _DetailsDescription: React.FC<Props> = ({
  apiKeysUrl,
  descriptionTitle,
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
    <Container>
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
      {(personalDetails || apiKeysUrl) && (
        <DetailsSettingsButtons
          isOwnAsset={isOwnAsset}
          asset={asset}
          personalDetails={personalDetails}
          id={id}
          systemUrl={systemUrl}
          notificationsUrl={notificationsUrl}
          settingsUrl={settingsUrl}
          apiKeysUrl={apiKeysUrl}
        />
      )}
    </Container>
  );
};

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
