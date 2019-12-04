import AssetTitle from "components/assets/asset-fields/asset-title";
import React from "react";
import { useTranslation } from "react-i18next";

import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC<Props> = ({ minimumDepositAmount }) => {
  const [t] = useTranslation();
  return (
    <>
      <AssetTitle>{t("create-fund-page.title")}</AssetTitle>
      <div className="create-asset__content">
        <CreateFundSettingsSection
          minimumDepositAmount={minimumDepositAmount}
        />
      </div>
    </>
  );
};

interface Props {
  minimumDepositAmount: number;
}

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
