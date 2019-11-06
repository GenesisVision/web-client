import "shared/components/deposit-details/deposit-details.scss";
import "./create-account-settings.scss";

import { CreateAssetFields } from "components/create-asset/create-asset-field/create-asset-field";
import useCreateAssetValidate from "components/create-asset/create-asset-validate.hook";
import { InjectedFormikProps, withFormik } from "formik";
import { Broker } from "gv-api-web";
import {
  CREATE_PROGRAM_FIELDS,
  getBrokerId,
  getCurrency,
  getLeverage
} from "pages/create-program/components/create-program-settings/create-program-settings.helpers";
import BrokerAccount from "pages/create-program/components/create-program-settings/fields/broker-account";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import Currency from "pages/create-program/components/create-program-settings/fields/currency";
import DepositDetailsBlock from "pages/create-program/components/create-program-settings/fields/deposit-details-block";
import Leverage from "pages/create-program/components/create-program-settings/fields/leverage";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import createAccountSettingsValidationSchema from "./create-account-settings.validators";

const _CreateAccountSettings: React.FC<Props> = ({
  t,
  broker,
  setFieldValue,
  handleSubmit,
  isValid,
  isSubmitting,
  minimumDepositsAmount,
  values: { brokerAccountTypeId, depositAmount, currency }
}) => {
  const accountType = broker.accountTypes.find(
    ({ id }) => brokerAccountTypeId === id
  )!;
  const validateAndSubmit = useCreateAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-account-page.settings.main-settings")}
        blockNumber={"01"}
      >
        <CreateAssetFields>
          <BrokerAccount
            setAccountType={(value: string) =>
              setFieldValue(CREATE_ACCOUNT_FIELDS.brokerAccountTypeId, value)
            }
            setLeverage={(value: number) =>
              setFieldValue(CREATE_ACCOUNT_FIELDS.leverage, value)
            }
            setCurrency={(value: string) =>
              setFieldValue(CREATE_ACCOUNT_FIELDS.currency, value)
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
        </CreateAssetFields>
      </SettingsBlock>
      <DepositDetailsBlock
        blockNumber={2}
        availableName={CREATE_ACCOUNT_FIELDS.available}
        rateName={CREATE_ACCOUNT_FIELDS.rate}
        walletFieldName={CREATE_ACCOUNT_FIELDS.depositWalletId}
        inputName={CREATE_ACCOUNT_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minimumDepositsAmount[currency]}
        setFieldValue={setFieldValue}
        assetCurrency={currency as CurrencyEnum}
      />
      <CreateAssetNavigation
        asset={ASSET.ACCOUNT}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export enum CREATE_ACCOUNT_FIELDS {
  available = "available",
  rate = "rate",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  currency = "currency",
  leverage = "leverage",
  brokerAccountTypeId = "brokerAccountTypeId"
}

export interface ICreateAccountSettingsFormValues {
  [CREATE_PROGRAM_FIELDS.available]: number;
  [CREATE_PROGRAM_FIELDS.rate]: number;
  [CREATE_ACCOUNT_FIELDS.leverage]: number;
  [CREATE_ACCOUNT_FIELDS.currency]: string;
  [CREATE_ACCOUNT_FIELDS.brokerAccountTypeId]: string;
  [CREATE_ACCOUNT_FIELDS.depositAmount]?: number;
  [CREATE_ACCOUNT_FIELDS.depositWalletId]: string;
}

export interface ICreateAccountSettingsProps
  extends WithTranslation,
    OwnProps {}

type Props = InjectedFormikProps<
  ICreateAccountSettingsProps,
  ICreateAccountSettingsFormValues
>;

const CreateAccountSettings = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<ICreateAccountSettingsProps, ICreateAccountSettingsFormValues>({
    displayName: "CreateAccountSettingsForm",
    mapPropsToValues: ({ broker }) => ({
      [CREATE_PROGRAM_FIELDS.available]: 0,
      [CREATE_PROGRAM_FIELDS.rate]: 1,
      [CREATE_ACCOUNT_FIELDS.brokerAccountTypeId]: getBrokerId(
        broker.accountTypes
      ),
      [CREATE_ACCOUNT_FIELDS.currency]: getCurrency(broker.accountTypes[0]),
      [CREATE_ACCOUNT_FIELDS.leverage]: getLeverage(broker.accountTypes[0]),
      [CREATE_ACCOUNT_FIELDS.depositWalletId]: "",
      [CREATE_ACCOUNT_FIELDS.depositAmount]: undefined
    }),
    validationSchema: createAccountSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CreateAccountSettings);
export default CreateAccountSettings;

interface OwnProps {
  minimumDepositsAmount: { [key: string]: number };
  broker: Broker;
  onSubmit: (
    values: ICreateAccountSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
