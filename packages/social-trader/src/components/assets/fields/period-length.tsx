import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";

import AssetField from "../asset-fields/asset-field";

const _PeriodLength: React.FC<Props> = ({ name, periods }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
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
      </GVFormikField>
    </AssetField>
  );
};

interface Props {
  periods: number[];
  name: string;
}

const PeriodLength = React.memo(_PeriodLength);
export default PeriodLength;
