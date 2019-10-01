import CreateAssetField from "components/create-asset/create-asset-field/create-asset-field";
import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { onSelectChange } from "shared/components/select/select.test-helpers";
import { CurrencyEnum } from "shared/utils/types";

const _Currency: React.FC<Props> = ({
  name,
  disabled,
  onChange,
  accountCurrencies
}) => {
  const [t] = useTranslation();
  return (
    <CreateAssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("manager.create-program-page.settings.fields.currency")}
        InputComponent={Select}
        disabled={disabled}
        disableIfSingle
        onChange={onSelectChange(onChange)}
      >
        {accountCurrencies.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </GVFormikField>
    </CreateAssetField>
  );
};

interface Props {
  name: string;
  disabled: boolean;
  onChange: (value: CurrencyEnum) => void;
  accountCurrencies: CurrencyEnum[];
}

const Currency = React.memo(_Currency);
export default Currency;
