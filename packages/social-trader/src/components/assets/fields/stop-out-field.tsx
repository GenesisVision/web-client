import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

interface Props {
  name: string;
  currentValue?: number;
}

const _StopOutField: React.FC<Props> = ({ currentValue, name }) => {
  const { t } = useTranslation();
  return (
    <AssetFormField
      isAllowed={allowPositiveValuesNumberFormat(4)}
      wide={false}
      name={name}
      label={t("asset-settings:fields.stop-out-level")}
      adornment="%"
      component={SimpleNumberField}
      hintTooltipContent={t(
        "create-account:settings.hints.stop-out-level-description"
      )}
      hintContent={t("create-account:settings.hints.stop-out-level")}
      rules={{
        required: t("validations.stop-out-required"),
        min: {
          value: 10,
          message: t("validations.stop-out-is-zero")
        },
        max: {
          value: currentValue || 100,
          message: t("validations.stop-out-is-large")
        }
      }}
    />
  );
};

const StopOutField = React.memo(_StopOutField);
export default StopOutField;
