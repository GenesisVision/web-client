import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { translate, TranslationFunction } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import rateApi from "shared/services/api-client/rate-api";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { number, object } from "yup";
import { FormikProps } from "formik";
import { WalletData, WalletInfo } from "gv-api-web";

export interface IFollowCreateAccountProps {
  walletsAddresses: WalletInfo[];
  wallets: any; // WalletData[];
  currency: string;
  onClick: () => void;
  errors?: any;
  isValid?: boolean;
  dirty?: boolean;
  t?: any;
  values?: FormValues;
  setFieldValue?: any;
}
interface IFollowCreateAccountState {
  rate: string;
  isPending: boolean;
}

export interface FormValues {
  walletFrom: string;
  amount: number;
}

type OwnProps = IFollowCreateAccountProps & FormikProps<FormValues>;
class FollowCreateAccount extends React.Component<
  OwnProps,
  IFollowCreateAccountState
> {
  state = {
    rate: "1",
    isPending: false
  };
  constructor(props: OwnProps) {
    super(props);
  }

  componentDidMount() {
    this.fetchRate();
  }

  onChangeCurrencyFrom = (name: any, target: any) => {
    const { setFieldValue } = this.props;
    const walletFromNew = target.props.value;
    setFieldValue("walletFrom", walletFromNew);
    this.fetchRate(walletFromNew);
  };
  fetchRate = (walletFrom?: any) => {
    const { values, currency } = this.props;
    rateApi
      .v10RateByFromByToGet(currency, walletFrom || values.walletFrom)
      .then((rate: string) => {
        if (rate !== this.state.rate) this.setState({ rate });
      });
  };

  render() {
    const {
      errors,
      isValid,
      dirty,
      walletsAddresses,
      wallets,
      t,
      currency,
      values,
      setFieldValue,
      onClick
    } = this.props;
    const { walletFrom, amount } = values;
    const { rate } = this.state;
    if (!rate) return null;
    const wallet = wallets.find(
      (wallet: any) => wallet.currency === walletFrom
    );
    const availableToWithdraw = wallet.available / +rate;
    const isAllow = (values: any) => {
      const { formattedValue, value } = values;
      return formattedValue === "" || validateFraction(value, currency);
    };

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(availableToWithdraw, currency)
      );
    };
    const disableButton = () => {
      return (
        errors.amount !== undefined ||
        !isValid ||
        !dirty ||
        amount > availableToWithdraw
      );
    };
    return (
      <form className="dialog__bottom" id="follow-create-account">
        <div className="dialog-field">
          <GVFormikField
            name="walletFrom"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyFrom}
          >
            {walletsAddresses.map((wallet: any) => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={getWalletIcon(wallet.currency)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.description} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
        </div>
        <div className="dialog-field">
          <StatisticItem label={"Available to withdraw"}>
            <NumberFormat
              value={formatCurrencyValue(availableToWithdraw, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="dialog-field">
          <InputAmountField
            name="amount"
            label={t("wallet-transfer.amount")}
            currency={currency}
            isAllow={isAllow(values)}
            setMax={setMaxAmount}
          />
          {currency !== walletFrom && (
            <div className="invest-popup__currency">
              <NumberFormat
                value={formatCurrencyValue(
                  convertFromCurrency(amount, rate),
                  walletFrom
                )}
                prefix="= "
                suffix={` ${walletFrom}`}
                displayType="text"
              />
            </div>
          )}
        </div>
        <div className="dialog__buttons">
          <GVButton
            onClick={onClick}
            // id="signUpFormSubmit"
            className="invest-form__submit-button"
            disabled={disableButton()}
          >
            {t("withdraw-program.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<React.ComponentType<IFollowCreateAccountProps>>(
  translate(),
  withFormik({
    displayName: "follow-create-account",
    mapPropsToValues: (props: { [key: string]: any }) => {
      const { walletsAddresses, currency } = props;
      if (!walletsAddresses === undefined || walletsAddresses.length <= 1)
        return {};
      let walletFrom = currency || "GVT";
      if (
        !walletsAddresses.find((wallet: any) => wallet.currency === walletFrom)
      ) {
        walletFrom = walletsAddresses[0].currency;
      }
      return { walletFrom, amount: 0 };
    },
    validationSchema: ({ t }: { t: TranslationFunction }) =>
      object().shape({
        amount: number()
          .required()
          .min(
            0,
            t("deposit-asset.validation.amount-min-value", {
              min: 0
            })
          )
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(FollowCreateAccount);
