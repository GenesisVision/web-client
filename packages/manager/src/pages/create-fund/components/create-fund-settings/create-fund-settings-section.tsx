import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import React from "react";
import { useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";
import { platformDataSelector } from "shared/reducers/platform-reducer";

import { PlatformDataLoaderData } from "../../services/create-fund.service";
import CreateFundSettings from "./create-fund-settings";

const _CreateFundSettingsSection: React.FC<{
  minimumDepositAmount: number;
}> = ({ minimumDepositAmount }) => {
  const platformSettings = useSelector(platformDataSelector);
  const handleCreate = useCreateAssetSubmit({ asset: ASSET.FUND });

  return (
    <CreateFundSettings
      loaderData={PlatformDataLoaderData}
      data={platformSettings!}
      minimumDepositAmount={minimumDepositAmount}
      onSubmit={handleCreate}
    />
  );
};

const CreateFundSettingsSection = React.memo(_CreateFundSettingsSection);
export default CreateFundSettingsSection;
