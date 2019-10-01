import CreateAssetField from "components/create-asset/create-asset-field/create-asset-field";
import { ProgramsInfo } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";

const _PeriodLength: React.FC<Props> = ({ name, programsInfo }) => {
  const [t] = useTranslation();
  return (
    <CreateAssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("manager.create-program-page.settings.fields.period")}
        InputComponent={Select}
      >
        {programsInfo.periods.map(period => (
          <option value={period} key={period}>
            {`${period} ${t(
              "manager.create-program-page.settings.fields.period-option-notation.day",
              { count: period }
            )}`}
          </option>
        ))}
      </GVFormikField>
    </CreateAssetField>
  );
};

interface Props {
  name: string;
  programsInfo: ProgramsInfo;
}

const PeriodLength = React.memo(_PeriodLength);
export default PeriodLength;
