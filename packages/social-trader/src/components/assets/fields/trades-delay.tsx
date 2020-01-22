import "./fields.scss";

import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import Select from "components/select/select";
import { DELAYS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _TradesDelay: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        wide
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
