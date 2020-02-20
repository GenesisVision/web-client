import { GVHookFormField } from "components/gv-hook-form-field";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { DELAYS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVHookFormField
        wide
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
      <Hint
        content={t("create-program-page.settings.hints.trades-delay")}
        className="asset-form-field__hint"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t("program-settings.trades-update.text")}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const TradesDelay = React.memo(_TradesDelay);
export default TradesDelay;
