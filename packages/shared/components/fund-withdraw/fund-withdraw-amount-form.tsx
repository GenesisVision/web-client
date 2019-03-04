import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { ComponentType, PureComponent } from "react";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import {
  calculatePercentage,
  convertFromCurrency
} from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { number, object } from "yup";

import { FundWithdraw } from "./fund-withdraw-popup";
import FundWithdrawResult from "./fund-withdraw-result";

interface IFundWithdrawAmountFormOwnProps {
  wallets: WalletData[];
  wallet: WalletData;
  enteredValue?: FundWithdraw;
  onSubmit(values: FundWithdrawAmountFormValues): void;
  exitFee: number;
  availableToWithdraw: number;
}

interface IFundWithdrawAmountFormProps
  extends InjectedTranslateProps,
    IFundWithdrawAmountFormOwnProps {}

interface FundWithdrawAmountFormValues {
  percent?: number;
  walletCurrency: string;
}

class FundWithdrawAmountForm extends PureComponent<
  InjectedFormikProps<
    IFundWithdrawAmountFormProps,
    FundWithdrawAmountFormValues
  >
> {
  isAllow = (values: NumberFormatValues) =>
    !values.floatValue ||
    (values.floatValue >= 0.01 && values.floatValue <= 100);

  setMaxAmount = () => {
    this.props.setFieldValue("percent", 100);
  };

  wallet = () => {
    const { wallets, wallet, values } = this.props;
    const selectedWallet = wallets.find(
      wallet => wallet.currency === values.walletCurrency
    );
    return selectedWallet || wallet;
  };

  render() {
    const {
      t,
      wallets,
      availableToWithdraw,
      exitFee,
      handleSubmit,
      values
    } = this.props;

    const selectedWallet = this.wallet();
    const availableToWithdrawCcy = convertFromCurrency(
      availableToWithdraw,
      selectedWallet.rateToGVT
    );
    const amountToWithdrawCcy = calculatePercentage(
      availableToWithdrawCcy,
      values.percent || 0
    );
    return (
      <form id="withdraw-form" onSubmit={handleSubmit}>
        <GVFormikField
          name="walletCurrency"
          component={GVTextField}
          label={t("withdraw-fund.wallet")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>
                <WalletImage
                  imageClassName="wallet-transfer-popup__icon"
                  alt={wallet.currency}
                  url={wallet.logo}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            );
          })}
        </GVFormikField>
        <InputAmountField
          name="percent"
          label={t("withdraw-fund.amount-to-withdraw")}
          placeholder="%"
          currency="%"
          isAllow={this.isAllow}
          setMax={this.setMaxAmount}
        />
        <div className="invest-popup__currency">
          <NumberFormat
            value={formatCurrencyValue(
              amountToWithdrawCcy,
              selectedWallet.currency
            )}
            prefix="&asymp; "
            suffix={` ${selectedWallet.currency}`}
            displayType="text"
          />
        </div>
        {exitFee !== 0 && (
          <FundWithdrawResult
            availableToWithdraw={availableToWithdrawCcy}
            currency={selectedWallet.currency}
            percent={values.percent || 0}
            exitFee={exitFee}
          />
        )}
        <div className="dialog__buttons">
          <GVButton type="submit" id="fundWithdrawAmountFormSubmit">
            {t("buttons.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<ComponentType<IFundWithdrawAmountFormOwnProps>>(
  translate(),
  withFormik<IFundWithdrawAmountFormProps, FundWithdrawAmountFormValues>({
    displayName: "withdraw-form",
    mapPropsToValues: ({ wallet, enteredValue }) => ({
      percent: enteredValue ? enteredValue.percent : undefined,
      walletCurrency: enteredValue ? enteredValue.currency : wallet.currency
    }),
    validationSchema: ({ t }: IFundWithdrawAmountFormProps) =>
      object().shape({
        percent: number()
          .required(t("withdraw-fund.validation.required"))
          .min(0.01, t("withdraw-fund.validation.min-value"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(FundWithdrawAmountForm);
