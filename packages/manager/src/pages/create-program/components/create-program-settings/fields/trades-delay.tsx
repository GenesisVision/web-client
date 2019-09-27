import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { DELAYS } from "shared/components/programs/program-details/program-history-section/program-open-positions/program-open-positions";
import Select from "shared/components/select/select";

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <div className="program-settings__block-wrapper create-program-settings__row">
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("manager.program-settings.trades-update.select")}
        InputComponent={Select}
      >
        {DELAYS.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </GVFormikField>
      <Hint
        content={t("manager.create-program-page.settings.hints.trades-delay")}
        className="create-program-settings__field-caption"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t("manager.program-settings.trades-update.text")}
      />
    </div>
  );
};

interface Props {
  name: string;
}

const TradesDelay = React.memo(_TradesDelay);
export default TradesDelay;
