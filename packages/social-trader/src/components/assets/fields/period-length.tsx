import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

interface Props {
  periods: number[];
  name: string;
}

const _PeriodLength: React.FC<Props> = ({ name, periods }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVHookFormField
        wide
        name={name}
        component={SimpleTextField}
        label={t("asset-settings:fields.period")}
        InputComponent={Select}
        rules={{
          required: t("validations.period-required")
        }}
      >
        {periods.map((period: any) => (
          <option value={period} key={period}>
            {`${period} ${t(
              "asset-settings:fields.period-option-notation.day",
              { count: period }
            )}`}
          </option>
        ))}
      </GVHookFormField>
    </AssetField>
  );
};

const PeriodLength = React.memo(_PeriodLength);
export default PeriodLength;
