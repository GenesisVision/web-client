import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

interface Props {
  name: string;
  accountLeverages: number[];
}

const _Leverage: React.FC<Props> = ({ name, accountLeverages }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVHookFormField
        wide
        name={name}
        component={SimpleTextField}
        label={t("asset-settings:fields.brokers-leverage")}
        InputComponent={Select}
        disableIfSingle
      >
        {accountLeverages.map(leverage => (
          <option value={leverage} key={leverage}>
            {leverage}
          </option>
        ))}
      </GVHookFormField>
    </AssetField>
  );
};

const Leverage = React.memo(_Leverage);
export default Leverage;
