import "components/details/details-description-section/details-description/details-description.scss";

import DetailsDescription from "components/details/details-description-section/details-description/details-description";
import { ToType } from "components/link/link";
import * as React from "react";

import { DetailsFullType, PersonalDetailsType } from "../../details.types";

const _DetailsDescriptionSection: React.FC<Props> = ({
  notificationsUrl,
  settingsUrl,
  personalDetails,
  PerformanceData,
  AssetDetailsExtraBlock,
  description,
  Controls
}) => {
  return (
    <div className="details__section asset-details-description">
      <DetailsDescription
        personalDetails={personalDetails}
        description={description}
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
  personalDetails: PersonalDetailsType;
  description: DetailsFullType;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  PerformanceData?: React.ComponentType<any>;
  Controls: React.ComponentType<any>;
}

const DetailsDescriptionSection = React.memo(_DetailsDescriptionSection);
export default DetailsDescriptionSection;
