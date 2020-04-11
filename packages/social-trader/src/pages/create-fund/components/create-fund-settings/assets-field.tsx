import { GVHookFormField } from "components/gv-hook-form-field";
import { MutedText } from "components/muted-text/muted-text";
import { ReallocateFieldWrapper } from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field-wrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundAssetsSelector } from "reducers/platform-reducer";

import "./assets-field.scss";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const [t] = useTranslation();
  const assets = useSelector(fundAssetsSelector);
  return (
    <>
      <div className="assets-field__text">
        <MutedText small>
          {t("create-fund-page.settings.fields.mandatory-assets")}
        </MutedText>
      </div>
      <GVHookFormField
        name={name}
        component={ReallocateFieldWrapper}
        assets={assets}
      />
    </>
  );
};
export const AssetsField = React.memo(_AssetsField);
