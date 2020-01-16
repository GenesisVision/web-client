import { AssetContentBlock } from "components/assets/asset-fields/asset-content.block";
import { AssetTitleBlock } from "components/assets/asset-fields/asset-title.block";
import React from "react";
import { useTranslation } from "react-i18next";

import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC = () => {
  const [t] = useTranslation();
  return (
    <>
      <AssetTitleBlock>{t("create-fund-page.title")}</AssetTitleBlock>
      <AssetContentBlock>
        <CreateFundSettingsSection />
      </AssetContentBlock>
    </>
  );
};

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
