import AssetField from "components/assets/asset-fields/asset-field";
import GVFormikField from "components/gv-formik-field";
import ReallocateField from "pages/funds/fund-settings/reallocation/components/reallocate-field";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundAssetsSelector } from "reducers/platform-reducer";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const [t] = useTranslation();
  const assets = useSelector(fundAssetsSelector);
  return (
    <AssetField wide>
      <div className="create-asset-settings__text">
        {t("create-fund-page.settings.fields.mandatory-assets")}
      </div>
      <GVFormikField name={name} component={ReallocateField} assets={assets} />
    </AssetField>
  );
};
export const AssetsField = React.memo(_AssetsField);
