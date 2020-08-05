import AssetField from "components/assets/asset-fields/asset-field";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import { onSelectChange } from "components/select/select.test-helpers";
import Crashable from "decorators/crashable";
import { BrokerAccountType } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

import { getCurrency, getLeverage } from "../asset.helpers";

interface Props {
  setLeverage: (value: number) => void;
  setCurrency: (value: string) => void;
  setAccountType: (value: string) => void;
  name: string;
  accountTypes: BrokerAccountType[];
}

const _BrokerAccount: React.FC<Props> = ({
  name,
  accountTypes,
  setAccountType,
  setCurrency,
  setLeverage
}) => {
  const handleAccountTypeChange = useCallback(
    (brokerAccountTypeId: string) => {
      const accountType = safeGetElemFromArray(
        accountTypes,
        ({ id }) => id === brokerAccountTypeId
      );
      setAccountType(accountType.id);
      setCurrency(getCurrency(accountType));
      setLeverage(getLeverage(accountType));
    },
    [accountTypes]
  );
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVHookFormField
        wide
        name={name}
        component={GVTextField}
        label={t("asset-settings:fields.account-type")}
        InputComponent={Select}
        disableIfSingle
        onChange={onSelectChange(handleAccountTypeChange)}
      >
        {accountTypes.map(accountType => (
          <option value={accountType.id} key={accountType.id}>
            {accountType.name}
          </option>
        ))}
      </GVHookFormField>
    </AssetField>
  );
};

const BrokerAccount = React.memo(Crashable(_BrokerAccount));
export default BrokerAccount;
