import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _Leverage: React.FC<Props> = ({ name, accountLeverages }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        wide
        name={name}
        component={GVTextField}
        label={t("create-program-page.settings.fields.brokers-leverage")}
        InputComponent={Select}
        disableIfSingle
      >
        {accountLeverages.map(leverage => (
          <option value={leverage} key={leverage}>
            {leverage}
          </option>
        ))}
      </GVFormikField>
    </AssetField>
  );
};

interface Props {
  name: string;
  accountLeverages: number[];
}

const Leverage = React.memo(_Leverage);
export default Leverage;
