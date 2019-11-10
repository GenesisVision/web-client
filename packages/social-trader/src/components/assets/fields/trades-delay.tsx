import "./fields.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { DELAYS } from "shared/components/programs/program-details/program-history-section/program-open-positions/program-open-positions";
import Select from "shared/components/select/select";

import AssetField from "../asset-fields/asset-field";

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("program-settings.trades-update.select")}
        InputComponent={Select}
      >
        {DELAYS.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </GVFormikField>
      <Hint
        content={t("create-program-page.settings.hints.trades-delay")}
        className="create-asset-settings__hint"
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
