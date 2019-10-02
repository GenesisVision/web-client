import useCreateAssetSection from "components/create-asset/create-asset-section.hook";
import React from "react";
import withLoader from "shared/decorators/with-loader";
import { fetchRate } from "shared/services/rate-service";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import CreateFundSettings, {
  ICreateFundSettingsFormValues
} from "./create-fund-settings";

const FUND_CURRENCY = "GVT";

const _CreateFundSettingsSection: React.FC<OwnProps> = ({
  navigateBack,
  onSubmit,
  author,
  minimumDepositAmount,
  managerMaxExitFee,
  managerMaxEntryFee
}) => {
  const { rate, handleWalletChange, wallet, wallets } = useCreateAssetSection({
    assetCurrency: FUND_CURRENCY
  });

  return (
    <CreateFundSettings
      condition={!!wallet}
      wallets={wallets}
      fundCurrency={FUND_CURRENCY}
      navigateBack={navigateBack}
      onSubmit={onSubmit}
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

const CreateFundSettingsSection = withLoader(
  React.memo(_CreateFundSettingsSection)
);
export default CreateFundSettingsSection;

interface OwnProps {
  currency: CurrencyEnum;
  managerMaxExitFee: number;
  managerMaxEntryFee: number;
  onSubmit: (
    data: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  navigateBack: () => void;
  author: string;
  minimumDepositAmount: number;
}
