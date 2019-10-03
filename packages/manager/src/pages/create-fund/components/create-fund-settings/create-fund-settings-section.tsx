import useCreateAssetSection from "components/create-asset/create-asset-section.hook";
import useCreateAssetSubmit from "components/create-asset/create-asset-submit.hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";
import useApiRequest from "shared/hooks/api-request.hook";
import { nameSelector } from "shared/reducers/header-reducer";
import { platformDataSelector } from "shared/reducers/platform-reducer";

import { FUND_CURRENCY } from "../../create-fund.constants";
import { fetchMinimumDepositAmount } from "../../services/create-fund.service";
import CreateFundSettings from "./create-fund-settings";

const _CreateFundSettingsSection: React.FC = ({}) => {
  const author = useSelector(nameSelector);

  const { data: minimumDepositAmount, sendRequest } = useApiRequest({
    request: fetchMinimumDepositAmount
  });
  useEffect(() => {
    sendRequest();
  }, []);

  const { rate, handleWalletChange, wallet, wallets } = useCreateAssetSection({
    assetCurrency: FUND_CURRENCY
  });

  const platformSettings = useSelector(platformDataSelector);
  const managerMaxExitFee =
    (platformSettings && platformSettings!.programsInfo.managerMaxExitFee) || 0;

  const managerMaxEntryFee =
    (platformSettings && platformSettings!.programsInfo.managerMaxEntryFee) ||
    0;

  const handleCreate = useCreateAssetSubmit({ asset: ASSET.FUND });

  return (
    <CreateFundSettings
      condition={!!wallet && !!minimumDepositAmount}
      wallets={wallets}
      onSubmit={handleCreate}
      author={author}
      minimumDepositAmount={minimumDepositAmount}
      managerMaxExitFee={managerMaxExitFee}
      managerMaxEntryFee={managerMaxEntryFee}
      rate={rate}
      wallet={wallet}
      onWalletChange={handleWalletChange}
    />
  );
};

const CreateFundSettingsSection = React.memo(_CreateFundSettingsSection);
export default CreateFundSettingsSection;
