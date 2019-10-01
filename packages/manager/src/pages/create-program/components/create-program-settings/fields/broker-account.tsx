import { BrokerAccountType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select, { ISelectChangeEvent } from "shared/components/select/select";

const _BrokerAccount: React.FC<Props> = ({ name, onChange, accountTypes }) => {
  const [t] = useTranslation();
  return (
    <div className="create-program-settings__field">
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("manager.create-program-page.settings.fields.account-type")}
        InputComponent={Select}
        disableIfSingle
        onChange={onChange}
      >
        {accountTypes.map(accountType => (
          <option value={accountType.id} key={accountType.id}>
            {accountType.type}
          </option>
        ))}
      </GVFormikField>
    </div>
  );
};

interface Props {
  name: string;
  onChange: (_: ISelectChangeEvent, target: JSX.Element) => void;
  accountTypes: BrokerAccountType[];
}

const BrokerAccount = React.memo(_BrokerAccount);
export default BrokerAccount;
