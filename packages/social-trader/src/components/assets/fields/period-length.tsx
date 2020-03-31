import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _PeriodLength: React.FC<Props> = ({ name, periods }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVHookFormField
        wide
        name={name}
        component={SimpleTextField}
        label={t("create-program-page.settings.fields.period")}
        InputComponent={Select}
      >
        {periods.map((period: any) => (
          <option value={period} key={period}>
            {`${period} ${t(
              "create-program-page.settings.fields.period-option-notation.day",
              { count: period }
            )}`}
          </option>
        ))}
      </GVHookFormField>
    </AssetField>
  );
};

interface Props {
  periods: number[];
  name: string;
}

const PeriodLength = React.memo(_PeriodLength);
export default PeriodLength;
