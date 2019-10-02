import ReallocateField from "pages/funds/fund-settings/reallocation/components/reallocate-field";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GVFormikField from "shared/components/gv-formik-field";
import { fundAssetsSelector } from "shared/reducers/platform-reducer";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const [t] = useTranslation();
  const assets = useSelector(fundAssetsSelector);
  return (
    <>
      <div className="create-asset-settings__text">
        {t("manager.create-fund-page.settings.fields.mandatory-assets")}
      </div>
      <GVFormikField name={name} component={ReallocateField} assets={assets} />
    </>
  );
};
export const AssetsField = React.memo(_AssetsField);
