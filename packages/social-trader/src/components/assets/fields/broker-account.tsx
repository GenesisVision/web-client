import AssetField from "components/assets/asset-fields/asset-field";
import { BrokerAccountType } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { onSelectChange } from "shared/components/select/select.test-helpers";

import { getCurrency, getLeverage } from "../asset.helpers";

const _BrokerAccount: React.FC<Props> = ({
  name,
  accountTypes,
  setAccountType,
  setCurrency,
  setLeverage
}) => {
  const handleAccountTypeChange = useCallback(
    (brokerAccountTypeId: string) => {
      const accountType = accountTypes.find(
        ({ id }) => id === brokerAccountTypeId
      )!;
      setAccountType(accountType.id);
      setCurrency(getCurrency(accountType));
      setLeverage(getLeverage(accountType));
    },
    [accountTypes]
  );
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("create-program-page.settings.fields.account-type")}
        InputComponent={Select}
        disableIfSingle
        onChange={onSelectChange(handleAccountTypeChange)}
      >
        {accountTypes.map(accountType => (
          <option value={accountType.id} key={accountType.id}>
            {accountType.type}
          </option>
        ))}
      </GVFormikField>
    </AssetField>
  );
};

interface Props {
  setLeverage: (value: number) => void;
  setCurrency: (value: string) => void;
  setAccountType: (value: string) => void;
  name: string;
  accountTypes: BrokerAccountType[];
}

const BrokerAccount = React.memo(_BrokerAccount);
export default BrokerAccount;
