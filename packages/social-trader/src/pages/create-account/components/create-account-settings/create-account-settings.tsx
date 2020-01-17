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
import SettingsBlock from "components/settings-block/settings-block";
import { InjectedFormikProps, withFormik } from "formik";
import { Broker } from "gv-api-web";
import { KycRequiredBlock } from "pages/create-account/components/create-account-settings/kyc-required-block";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { compose } from "redux";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import createAccountSettingsValidationSchema from "./create-account-settings.validators";

const _CreateAccountSettings: React.FC<Props> = ({
  setFieldTouched,
  t,
  broker,
  setFieldValue,
  handleSubmit,
  errors,
  isSubmitting,
  values: { brokerAccountTypeId, depositAmount, currency, enterMinDeposit }
}) => {
  const isValid = Object.values(errors).length === 0;
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const accountType = safeGetElemFromArray(
    broker.accountTypes,
    ({ id }) => brokerAccountTypeId === id
  );
  const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
  const validateAndSubmit = useAssetValidate({ handleSubmit, isValid });
  const kycRequired = !isKycConfirmed && accountType.isKycRequired;
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-account-page.settings.main-settings")}
        blockNumber={"01"}
      >
        <AssetFields>
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
        </AssetFields>
      </SettingsBlock>
      {kycRequired ? (
        <KycRequiredBlock />
      ) : (
        <>
          {accountType.isDepositRequired && (
            <DepositDetailsBlock
              setFieldTouched={setFieldTouched}
              enterMinDeposit={enterMinDeposit}
              enterMinDepositName={CREATE_ACCOUNT_FIELDS.enterMinDeposit}
              blockNumber={2}
              availableName={CREATE_ACCOUNT_FIELDS.available}
              rateName={CREATE_ACCOUNT_FIELDS.rate}
              walletFieldName={CREATE_ACCOUNT_FIELDS.depositWalletId}
              inputName={CREATE_ACCOUNT_FIELDS.depositAmount}
              depositAmount={depositAmount}
              minimumDepositAmount={minimumDepositAmount}
              setFieldValue={setFieldValue}
              assetCurrency={currency as CurrencyEnum}
            />
          )}
          <CreateAssetNavigation
            asset={"ACCOUNT"}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </form>
  );
};

export enum CREATE_ACCOUNT_FIELDS {
  enterMinDeposit = "enterMinDeposit",
  available = "available",
  rate = "rate",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  currency = "currency",
  leverage = "leverage",
  brokerAccountTypeId = "brokerAccountTypeId"
}

export interface ICreateAccountSettingsFormValues {
  [CREATE_ACCOUNT_FIELDS.enterMinDeposit]?: boolean;
  [CREATE_ACCOUNT_FIELDS.available]: number;
  [CREATE_ACCOUNT_FIELDS.rate]: number;
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
    // isInitialValid: true,
    displayName: "CreateAccountSettingsForm",
    mapPropsToValues: ({ broker }) => ({
      [CREATE_ACCOUNT_FIELDS.available]: 0,
      [CREATE_ACCOUNT_FIELDS.rate]: 1,
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
  broker: Broker;
  onSubmit: (
    values: ICreateAccountSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
