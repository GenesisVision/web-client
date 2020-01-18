import { AssetContentBlock } from "components/assets/asset-fields/asset-content.block";
import React from "react";

import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC = () => {
  return (
    <AssetContentBlock>
      <CreateFundSettingsSection />
    </AssetContentBlock>
  );
};

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
