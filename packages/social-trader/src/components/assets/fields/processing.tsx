import styles from "components/assets/asset-fields/asset-form-field.module.scss";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

type HourType = {
  label: string;
  hour: number;
};

interface Props {
  wide?: boolean;
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
  wide,
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
      <Row hide={realtimeValue}>
        <GVHookFormField
          wide={wide}
          name={selectName}
          component={SimpleTextField}
          label={t("asset-settings:fields.time")}
          InputComponent={Select}
        >
          {HOURS.map(({ hour, label }: HourType) => (
            <option value={hour} key={hour}>
              {label}
            </option>
          ))}
        </GVHookFormField>
      </Row>
      <Row>
        <Text muted size={"small"}>
          <Hint
            content={t("asset-settings:hints.processing-label")}
            className={styles["asset-form-field__hint"]}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t("asset-settings:hints.processing-text")}
          />
        </Text>
      </Row>
    </AssetField>
  );
};

const Processing = React.memo(_Processing);
export default Processing;
