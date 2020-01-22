import useCreateAssetSubmit from "components/assets/create-asset/create-asset-submit.hook";
import { CREATE_ASSET } from "constants/constants";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import React from "react";
import { useSelector } from "react-redux";
import { createFundInfoSelector } from "reducers/platform-reducer";

import { PlatformDataLoaderData } from "../../services/create-fund.service";
import CreateFundSettings from "./create-fund-settings";

const _CreateFundSettingsSection: React.FC = () => {
  const createFundInfo = useSelector(createFundInfoSelector);
  const handleCreate = useCreateAssetSubmit({ asset: CREATE_ASSET.FUND });
  const wallets = useSelector(walletsSelector);

  return (
    <CreateFundSettings
      wallets={wallets}
      loaderData={PlatformDataLoaderData}
      data={createFundInfo!}
      onSubmit={handleCreate}
    />
  );
};

const CreateFundSettingsSection = React.memo(_CreateFundSettingsSection);
export default CreateFundSettingsSection;
