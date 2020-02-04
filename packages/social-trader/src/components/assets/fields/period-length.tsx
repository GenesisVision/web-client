import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _PeriodLength: React.FC<Props> = ({ name, periods }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        wide
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
