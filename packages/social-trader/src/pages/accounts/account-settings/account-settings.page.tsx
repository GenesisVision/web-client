import AssetSettingsLoader from "modules/asset-settings/asset-settings.loader";
import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { accountDescriptionSelector } from "pages/accounts/account-details/reducers/description.reducer";
import React from "react";
import { useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";

import AccountSettings from "./account-settings";
import { redirectToDashboard } from "./services/account-settings.service";

const _AccountSettingsPage: React.FC = () => {
  const description = useSelector(accountDescriptionSelector);

  return (
    <AssetSettingsPage
      redirectToAsset={redirectToDashboard}
      asset={ASSET.PROGRAM}
      description={description as AssetDescriptionType}
      dispatchDescription={() => {}}
      settingsBlocks={(editProgram: any, applyCloseAsset: any) => (
        <AccountSettings
          condition={!!description}
          closeProgram={applyCloseAsset}
          details={description!}
          loader={<AssetSettingsLoader />}
        />
      )}
    />
  );
};

const AccountSettingsPage = React.memo(_AccountSettingsPage);
export default AccountSettingsPage;
