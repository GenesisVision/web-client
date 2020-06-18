import { GVHookFormField } from "components/gv-hook-form-field";
import Hint from "components/hint/hint";
import { MutedText } from "components/muted-text/muted-text";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { DELAYS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <>
      <GVHookFormField
        wide={false}
        name={name}
        component={SimpleTextField}
        label={t("program-settings.trades-update.select")}
        InputComponent={Select}
      >
        {DELAYS.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </GVHookFormField>
      <Row>
        <MutedText small>
          <Hint
            content={t("create-program-page.settings.hints.trades-delay")}
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t("program-settings.trades-update.text")}
          />
        </MutedText>
      </Row>
    </>
  );
};

interface Props {
  name: string;
}

const TradesDelay = React.memo(_TradesDelay);
export default TradesDelay;
