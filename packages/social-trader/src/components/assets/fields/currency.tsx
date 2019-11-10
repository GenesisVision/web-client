import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { CurrencyEnum } from "shared/utils/types";

import AssetField from "../asset-fields/asset-field";

const _Currency: React.FC<Props> = ({ name, disabled, accountCurrencies }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
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
