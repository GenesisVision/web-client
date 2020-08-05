import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
}

const _StopOutField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetFormField
      wide={false}
      name={name}
      label={t("asset-settings:fields.stop-out-level")}
      adornment="%"
      component={SimpleNumberField}
      hintTooltipContent={t(
        "create-account:settings.hints.stop-out-level-description"
      )}
      hintContent={t("create-account:settings.hints.stop-out-level")}
    />
  );
};

const StopOutField = React.memo(_StopOutField);
export default StopOutField;
