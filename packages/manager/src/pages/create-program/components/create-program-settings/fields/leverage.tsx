import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { onSelectChange } from "shared/components/select/select.test-helpers";

const _Leverage: React.FC<Props> = ({
  name,
  disabled,
  onChange,
  accountLeverages
}) => {
  const [t] = useTranslation();
  return (
    <div className="create-program-settings__field">
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t(
          "manager.create-program-page.settings.fields.brokers-leverage"
        )}
        InputComponent={Select}
        disabled={!disabled}
        disableIfSingle
        className="create-program-settings__leverage"
        onChange={onSelectChange(onChange)}
      >
        {accountLeverages.map(leverage => (
          <option value={leverage} key={leverage}>
            {leverage}
          </option>
        ))}
      </GVFormikField>
    </div>
  );
};

interface Props {
  name: string;
  disabled: boolean;
  onChange: (value: number) => void;
  accountLeverages: number[];
}

const Leverage = React.memo(_Leverage);
export default Leverage;
