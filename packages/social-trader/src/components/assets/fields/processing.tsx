import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

type HourType = {
  label: string;
  hour: number;
};

interface Props {
  realtimeValue?: boolean;
  checkboxName: string;
  selectName: string;
}

const HOURS: HourType[] = Array(24)
  .fill("")
  .map((_, i) => i)
  .map(item => `${item}:00`)
  .map((label, hour) => ({
    label,
    hour
  }));

const _Processing: React.FC<Props> = ({
  realtimeValue,
  selectName,
  checkboxName
}) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <Row>
        <GVHookFormField
          wide
          type="checkbox"
          color="primary"
          name={checkboxName}
          label={t("asset-settings:fields.realtime")}
          component={GVCheckbox}
        />
      </Row>
      {!realtimeValue && (
        <Row>
          <GVHookFormField
            wide
            name={selectName}
            component={SimpleTextField}
            label={t("asset-settings:fields.processing")}
            InputComponent={Select}
          >
            {HOURS.map(({ hour, label }: HourType) => (
              <option value={hour} key={hour}>
                {label}
              </option>
            ))}
          </GVHookFormField>
        </Row>
      )}
    </AssetField>
  );
};

const Processing = React.memo(_Processing);
export default Processing;
