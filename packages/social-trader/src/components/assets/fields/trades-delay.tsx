import { GVHookFormField } from "components/gv-hook-form-field";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { Text } from "components/text/text";
import { DELAYS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
}

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <>
      <GVHookFormField
        wide={false}
        name={name}
        component={SimpleTextField}
        label={t("asset-settings:trades-update.select")}
        InputComponent={Select}
      >
        {DELAYS.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </GVHookFormField>
      <Row>
        <Text muted size={"small"}>
          <Hint
            content={t("create-account:settings.hints.trades-delay")}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t("asset-settings:trades-update.text")}
          />
        </Text>
      </Row>
    </>
  );
};

const TradesDelay = React.memo(_TradesDelay);
export default TradesDelay;
