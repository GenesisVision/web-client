import { AssetFields } from "components/assets/asset-fields/asset-field";
import useAssetValidate from "components/assets/asset-validate.hook";
import {
  getBrokerId,
  getCurrency,
  getLeverage
} from "components/assets/asset.helpers";
import BrokerAccount from "components/assets/fields/broker-account";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import Currency from "components/assets/fields/currency";
import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
import Leverage from "components/assets/fields/leverage";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { Broker, BrokerAccountType } from "gv-api-web";
import { KycRequiredBlock } from "pages/create-account/components/create-account-settings/kyc-required-block";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import createAccountSettingsValidationSchema from "./create-account-settings.validators";

export enum CREATE_ACCOUNT_FIELDS {
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  currency = "currency",
  leverage = "leverage",
  brokerAccountTypeId = "brokerAccountTypeId"
}

export interface ICreateAccountSettingsFormValues {
  [CREATE_ACCOUNT_FIELDS.brokerAccountTypeId]: string;
  [CREATE_ACCOUNT_FIELDS.leverage]: number;
  [CREATE_ACCOUNT_FIELDS.currency]: string;
  [CREATE_ACCOUNT_FIELDS.depositWalletId]: string;
  [CREATE_ACCOUNT_FIELDS.depositAmount]?: number | string;
}

interface Props {
  errorMessage?: string;
  broker: Broker;
  onSubmit: (values: ICreateAccountSettingsFormValues) => void;
}

const _CreateAccountSettings: React.FC<Props> = ({
  errorMessage,
  broker,
  onSubmit
}) => {
  const [available, setAvailable] = useState(0);
  const [rate, setRate] = useState(1);
  const [t] = useTranslation();

  const form = useForm<ICreateAccountSettingsFormValues>({
    defaultValues: {
      [CREATE_ACCOUNT_FIELDS.brokerAccountTypeId]: getBrokerId(
        broker.accountTypes
      ),
      [CREATE_ACCOUNT_FIELDS.currency]: getCurrency(broker.accountTypes[0]),
      [CREATE_ACCOUNT_FIELDS.leverage]: getLeverage(broker.accountTypes[0]),
      [CREATE_ACCOUNT_FIELDS.depositWalletId]: "",
      [CREATE_ACCOUNT_FIELDS.depositAmount]: undefined
    },
    validationSchema: createAccountSettingsValidationSchema({
      rate,
      t,
      broker,
      available
    }),
    mode: "onChange"
  });
  const {
    watch,
    setValue,
    formState: { isValid, dirty }
  } = form;
  const { brokerAccountTypeId, depositAmount, currency } = watch();

  const accountType = safeGetElemFromArray<BrokerAccountType>(
    broker.accountTypes,
    ({ id }) => brokerAccountTypeId === id
  );

  const disabled = accountType.isDepositRequired && !dirty;

  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const kycRequired = !isKycConfirmed && accountType.isKycRequired;

  const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
  const validateAndSubmit = useAssetValidate({
    handleSubmit: onSubmit,
    isValid
  });

  return (
    <HookForm form={form} onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-account:settings.main-settings")}
        blockNumber={"01"}
      >
        <AssetFields>
          <BrokerAccount
            setAccountType={(value: string) =>
              setValue(CREATE_ACCOUNT_FIELDS.brokerAccountTypeId, value)
            }
            setLeverage={(value: number) =>
              setValue(CREATE_ACCOUNT_FIELDS.leverage, value)
            }
            setCurrency={(value: string) =>
              setValue(CREATE_ACCOUNT_FIELDS.currency, value)
            }
            name={CREATE_ACCOUNT_FIELDS.brokerAccountTypeId}
            accountTypes={broker.accountTypes}
          />
          <Currency
            name={CREATE_ACCOUNT_FIELDS.currency}
            disabled={accountType === undefined}
            accountCurrencies={accountType.currencies as CurrencyEnum[]}
          />
          <Leverage
            name={CREATE_ACCOUNT_FIELDS.leverage}
            accountLeverages={accountType.leverages}
          />
        </AssetFields>
      </SettingsBlock>
      {kycRequired ? (
        <KycRequiredBlock />
      ) : (
        <>
          <DepositDetailsBlock
            broker={accountType.type}
            hide={!accountType.isDepositRequired}
            blockNumber={2}
            setAvailable={setAvailable}
            setRate={setRate}
            walletFieldName={CREATE_ACCOUNT_FIELDS.depositWalletId}
            inputName={CREATE_ACCOUNT_FIELDS.depositAmount}
            depositAmount={depositAmount}
            minimumDepositAmount={minimumDepositAmount}
            setFieldValue={setValue}
            assetCurrency={currency as CurrencyEnum}
          />
          <Row size={"large"}>
            <CreateAssetNavigation
              asset={"ACCOUNT"}
              isSuccessful={!errorMessage}
              disabled={disabled}
            />
          </Row>
        </>
      )}
    </HookForm>
  );
};

const CreateAccountSettings = React.memo(_CreateAccountSettings);
export default CreateAccountSettings;
