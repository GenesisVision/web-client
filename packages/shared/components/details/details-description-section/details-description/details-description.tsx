import {
  FundDetailsFull,
  PersonalFundDetailsFull,
  PersonalProgramDetailsFullOld,
  ProgramDetailsFullOld
} from "gv-api-web";
import * as React from "react";
import { DetailsInfo } from "shared/components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "shared/components/details/details-description-section/details-description/details-settings-buttons.block";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";

const _DetailsDescription: React.FC<Props> = ({
  personalDetails,
  description,
  AssetDetailsAvatar,
  AssetDetailsExtraBlock,
  notificationsUrl,
  settingsUrl
}) => (
  <div className="asset-details-description__main">
    <AssetDetailsAvatar />
    <DetailsInfo
      title={description.title}
      to={{
        pathname: composeManagerDetailsUrl(description.manager.url),
        state: `/ ${description.title}`
      }}
      username={description.manager.username}
      socialLinks={description.manager.socialLinks}
      description={description.description}
    >
      <AssetDetailsExtraBlock />
    </DetailsInfo>
    <DetailsSettingsButtons
      personalDetails={personalDetails}
      id={description.id}
      title={description.title}
      notificationsUrl={notificationsUrl}
      settingsUrl={settingsUrl}
    />
  </div>
);

interface Props {
  notificationsUrl: string;
  settingsUrl: string;
  AssetDetailsAvatar: React.ComponentType<any>;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  description: FundDetailsFull | ProgramDetailsFullOld;
  personalDetails: PersonalProgramDetailsFullOld | PersonalFundDetailsFull;
}

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
