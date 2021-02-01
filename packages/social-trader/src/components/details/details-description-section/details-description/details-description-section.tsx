import DetailsDescription from "components/details/details-description-section/details-description/details-description";
import { $paddingControlsLeft } from "components/details/details-description-section/details-description/details-description.style";
import { PersonalDetailsType } from "components/details/details.types";
import { ToType } from "components/link/link";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";
import {
  mediaBreakpointDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { $paddingXxsmall } from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

interface Props {
  descriptionTitle?: string;
  id: string;
  logo: string;
  title: string;
  isOwnAsset?: boolean;
  personalDetails?: PersonalDetailsType;
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
  description?: string;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  PerformanceData?: React.ComponentType<any>;
  Controls?: React.ComponentType<any>;
}

const ControlsRow = styled(Row)`
  ${mediaBreakpointDesktop(`
      margin-left: ${-$paddingXxsmall / 2}px;
      flex-wrap: nowrap;
  `)}
  ${mediaBreakpointTablet(`
      margin-left: ${$paddingControlsLeft}px;
      margin-right: 0;
  `)}
`;

const _DetailsDescriptionSection: React.FC<Props> = ({
  apiKeysUrl,
  descriptionTitle,
  personalDetails,
  isOwnAsset,
  id,
  title,
  logo,
  color,
  currency,
  subtitleUrl,
  socialLinks,
  subtitle,
  asset,
  systemUrl,
  notificationsUrl,
  settingsUrl,
  programDetails,
  PerformanceData,
  AssetDetailsExtraBlock,
  description,
  Controls
}) => {
  return (
    <div>
      <DetailsDescription
        descriptionTitle={descriptionTitle}
        personalDetails={personalDetails}
        isOwnAsset={isOwnAsset}
        id={id}
        title={title}
        logo={logo}
        color={color}
        currency={currency}
        subtitleUrl={subtitleUrl}
        socialLinks={socialLinks}
        subtitle={subtitle}
        asset={asset}
        programDetails={programDetails}
        description={description}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        systemUrl={systemUrl}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
        apiKeysUrl={apiKeysUrl}
      />
      {PerformanceData && (
        <Row size={"xlarge"}>
          <PerformanceData />
        </Row>
      )}
      {Controls && (
        <ControlsRow center={false} size={"xlarge"} wrap>
          <Controls />
        </ControlsRow>
      )}
    </div>
  );
};

const DetailsDescriptionSection = React.memo(_DetailsDescriptionSection);
export default DetailsDescriptionSection;
