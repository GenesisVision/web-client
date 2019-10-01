import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select, { ISelectChangeEvent } from "shared/components/select/select";
import { CurrencyEnum } from "shared/utils/types";

const _Currency: React.FC<Props> = ({
  name,
  disabled,
  onChange,
  accountCurrencies
}) => {
  const [t] = useTranslation();
  return (
    <div className="create-program-settings__field">
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("manager.create-program-page.settings.fields.currency")}
        InputComponent={Select}
        disabled={disabled}
        disableIfSingle
        onChange={onChange}
      >
        {accountCurrencies.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </GVFormikField>
    </div>
  );
};

interface Props {
  name: string;
  disabled: boolean;
  onChange: (_: ISelectChangeEvent, target: JSX.Element) => void;
  accountCurrencies: CurrencyEnum[];
}

const Currency = React.memo(_Currency);
export default Currency;
