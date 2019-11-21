import { DetailsInfo } from "components/details/details-description-section/details-description/details-info.block";
import { DetailsSettingsButtons } from "components/details/details-description-section/details-description/details-settings-buttons.block";
import { ToType } from "components/link/link";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";

import { DetailsFullType, PersonalDetailsType } from "../../details.types";
import { DetailsLimitsAvatar } from "./details-limits-avatar.block";

const _DetailsDescription: React.FC<Props> = ({
  personalDetails,
  description,
  AssetDetailsExtraBlock,
  notificationsUrl,
  settingsUrl
}) => (
  <div className="asset-details-description__main">
    <DetailsLimitsAvatar
      logo={description.logo}
      level={"level" in description ? description.level : undefined}
      levelProgress={
        "levelProgress" in description ? description.levelProgress : undefined
      }
      title={description.title}
      color={description.color}
      totalAvailableInvestment={
        "totalAvailableInvestment" in description
          ? description.totalAvailableInvestment
          : undefined
      }
      currency={"level" in description ? description.currency : undefined}
    />
    <DetailsInfo
      title={description.title}
      to={managerToPathCreator(description.owner.url, description.title)}
      username={description.owner.username}
      socialLinks={description.owner.socialLinks}
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
  notificationsUrl: ToType;
  settingsUrl: ToType;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  description: DetailsFullType;
  personalDetails: PersonalDetailsType;
}

const DetailsDescription = React.memo(_DetailsDescription);
export default DetailsDescription;
