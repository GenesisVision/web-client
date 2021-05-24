import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { WalletDepositData } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  values: Array<WalletDepositData>;
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
      {values.map(({ blockchain, blockchainTitle }) => (
        <option value={blockchain} key={blockchain}>
          {blockchainTitle}
        </option>
      ))}
    </GVHookFormField>
  );
};

const BlockchainSelectContainer = React.memo(_BlockchainSelectContainer);
export default BlockchainSelectContainer;
