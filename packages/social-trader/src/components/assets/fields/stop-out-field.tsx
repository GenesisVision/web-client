import "./fields.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";

import AssetField from "../asset-fields/asset-field";

const _StopOutField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        name={name}
        label={t("create-program-page.settings.fields.stop-out-level")}
        adornment="%"
        component={GVTextField}
        type="number"
        autoComplete="off"
        decimalScale={4}
      />
      <Hint
        content={t("create-program-page.settings.hints.stop-out-level")}
        className="create-asset-settings__hint"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t(
          "create-program-page.settings.hints.stop-out-level-description"
        )}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const StopOutField = React.memo(_StopOutField);
export default StopOutField;
