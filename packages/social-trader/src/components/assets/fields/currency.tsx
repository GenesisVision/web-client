import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";

const _Currency: React.FC<Props> = ({ name, disabled, accountCurrencies }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        wide
        name={name}
        component={GVTextField}
        label={t("create-program-page.settings.fields.currency")}
        InputComponent={Select}
        disabled={disabled}
        disableIfSingle
      >
        {accountCurrencies.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </GVFormikField>
    </AssetField>
  );
};

interface Props {
  name: string;
  disabled: boolean;
  accountCurrencies: CurrencyEnum[];
}

const Currency = React.memo(_Currency);
export default Currency;
