import "shared/components/details/details-description-section/details-description/details-description.scss";

import {
  FundDetailsFull,
  PersonalFundDetailsFull,
  PersonalProgramDetailsFullOld,
  ProgramDetailsFullOld
} from "gv-api-web";
import * as React from "react";
import DetailsDescription from "shared/components/details/details-description-section/details-description/details-description";
import { ToType } from "shared/components/link/link";

const _DetailsDescriptionSection: React.FC<Props> = ({
  notificationsUrl,
  settingsUrl,
  personalDetails,
  PerformanceData,
  AssetDetailsExtraBlock,
  AssetDetailsAvatar,
  description,
  Controls
}) => {
  return (
    <div className="details__section asset-details-description">
      <DetailsDescription
        personalDetails={personalDetails}
        description={description}
        AssetDetailsAvatar={AssetDetailsAvatar}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
      />
      {PerformanceData && <PerformanceData />}
      <div className="asset-details-description__controls">
        <Controls />
      </div>
    </div>
  );
};

interface Props {
  notificationsUrl: ToType;
  settingsUrl: ToType;
  personalDetails: PersonalProgramDetailsFullOld | PersonalFundDetailsFull;
  description: FundDetailsFull | ProgramDetailsFullOld;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  PerformanceData?: React.ComponentType<any>;
  AssetDetailsAvatar: React.ComponentType<any>;
  Controls: React.ComponentType<any>;
}

const DetailsDescriptionSection = React.memo(_DetailsDescriptionSection);
export default DetailsDescriptionSection;
