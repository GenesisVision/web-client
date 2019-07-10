import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";

const _CreateProgramStopOutField: React.FC<Props> = ({ name, t }) => (
  <div className="create-program-settings__field">
    <GVFormikField
      name={name}
      label={t("manager.create-program-page.settings.fields.stop-out-level")}
      adornment="%"
      component={GVTextField}
      type="number"
      autoComplete="off"
      decimalScale={4}
    />
    <Hint
      content={t("manager.create-program-page.settings.hints.stop-out-level")}
      className="create-program-settings__field-caption"
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      tooltipContent={t(
        "manager.create-program-page.settings.hints.stop-out-level-description"
      )}
    />
  </div>
);

interface Props extends InjectedTranslateProps {
  name: string;
}

const CreateProgramStopOutField = translate()(
  React.memo(_CreateProgramStopOutField)
);
export default CreateProgramStopOutField;
