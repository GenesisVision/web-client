import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _StopOutField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetFormField
      wide
      name={name}
      label={t("create-program-page.settings.fields.stop-out-level")}
      adornment="%"
      component={SimpleNumberField}
      hintTooltipContent={t(
        "create-program-page.settings.hints.stop-out-level-description"
      )}
      hintContent={t("create-program-page.settings.hints.stop-out-level")}
    />
  );
};

interface Props {
  name: string;
}

const StopOutField = React.memo(_StopOutField);
export default StopOutField;
