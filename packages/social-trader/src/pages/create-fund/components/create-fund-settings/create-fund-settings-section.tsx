import AssetContent from "components/assets/asset-fields/asset-content";
import useCreateAssetSubmit from "components/assets/create-asset/create-asset-submit.hook";
import React from "react";
import { useSelector } from "react-redux";
import { CREATE_ASSET } from "shared/constants/constants";
import {
  createFundInfoSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";

import { PlatformDataLoaderData } from "../../services/create-fund.service";
import CreateFundSettings from "./create-fund-settings";

const _CreateFundSettingsSection: React.FC<{
  minimumDepositAmount: number;
}> = ({ minimumDepositAmount }) => {
  const createFundInfo = useSelector(createFundInfoSelector);
  const handleCreate = useCreateAssetSubmit({ asset: CREATE_ASSET.FUND });

  return (
    <AssetContent>
      <CreateFundSettings
        loaderData={PlatformDataLoaderData}
        data={createFundInfo!}
        minimumDepositAmount={minimumDepositAmount}
        onSubmit={handleCreate}
      />
    </AssetContent>
  );
};

const CreateFundSettingsSection = React.memo(_CreateFundSettingsSection);
export default CreateFundSettingsSection;
