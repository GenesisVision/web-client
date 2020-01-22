import AssetSettingsPage from "modules/asset-settings/asset-settings.page";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import { accountDescriptionSelector } from "pages/accounts/account-details/reducers/description.reducer";
import React from "react";
import { useSelector } from "react-redux";

import AccountSettings from "./account-settings";
import { redirectToDashboard } from "./services/account-settings.service";

const _AccountSettingsPage: React.FC = () => {
  const description = useSelector(accountDescriptionSelector);

  return (
    <AssetSettingsPage
      redirectToAsset={redirectToDashboard}
      asset={CLOSEABLE_ASSET.TRADING_ACCOUNT}
      description={description as AssetDescriptionType}
      dispatchDescription={() => {}}
      settingsBlocks={(editProgram: any, applyCloseAsset: any) => (
        <AccountSettings
          condition={!!description}
          closeProgram={applyCloseAsset}
          details={description!}
        />
      )}
    />
  );
};

const AccountSettingsPage = React.memo(_AccountSettingsPage);
export default AccountSettingsPage;
