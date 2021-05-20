import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { Blockchain } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  values: Blockchain[];
}

const _BlockchainSelectContainer: React.FC<Props> = ({ name, values }) => {
  const [t] = useTranslation();
  return (
    <GVHookFormField
      wide
      name={name}
      component={SimpleTextField}
      label={t("wallet-deposit.select-blockchain")}
      InputComponent={Select}
    >
      {values.map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </GVHookFormField>
  );
};

const BlockchainSelectContainer = React.memo(_BlockchainSelectContainer);
export default BlockchainSelectContainer;
