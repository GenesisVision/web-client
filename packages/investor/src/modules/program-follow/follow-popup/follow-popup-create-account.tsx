import { FormikProps, withFormik } from "formik";
import {
  AttachToSignalProviderInitialDepositCurrencyEnum,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import rateApi from "shared/services/api-client/rate-api";
import filesService from "shared/services/file-service";
import {
  convertFromCurrency,
  convertToCurrency
} from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { Schema, lazy, number, object } from "yup";

class FollowCreateAccount extends React.PureComponent<Props, State> {
  state = {
    isPending: false
  };

  componentDidMount() {
    this.fetchRate();
  }

  onChangeCurrencyFrom = (name: any, target: any) => {
    const { setFieldValue, setFieldTouched } = this.props;
    const initialDepositCurrencyNew = target.props.value;
    setFieldValue("initialDepositCurrency", initialDepositCurrencyNew);
    setFieldValue("initialDepositAmount", "");
    setFieldTouched("initialDepositAmount", false);
    this.fetchRate(initialDepositCurrencyNew);
  };
  fetchRate = (initialDepositCurrency?: any) => {
    const { values, currency, setFieldValue } = this.props;
    rateApi
      .v10RateByFromByToGet(
        currency,
        initialDepositCurrency || values.initialDepositCurrency
      )
      .then((rate: number) => {
        if (rate !== values.rate) setFieldValue("rate", rate);
      });
  };
  handleNext = () => {
    const { values, onClick } = this.props;
    onClick(values);
  };
  render() {
    const {
      errors,
      isValid,
      dirty,
      wallets,
      t,
      currency,
      values,
      setFieldValue
    } = this.props;
    const { initialDepositCurrency, initialDepositAmount, rate } = values;
    const wallet = wallets.find(
      (wallet: WalletData) => wallet.currency === initialDepositCurrency
    );
    const availableToWithdraw = wallet ? wallet.available : 0;
    const isAllow = (values: any) => {
      const { formattedValue, value } = values;
      return formattedValue === "" || validateFraction(value, currency);
    };

    const setMaxAmount = () => {
      setFieldValue(
        "initialDepositAmount",
        formatCurrencyValue(availableToWithdraw, currency)
      );
    };
    const disableButton = () => {
      return (
        errors.initialDepositAmount !== undefined ||
        (!dirty && !isValid) ||
        initialDepositAmount > availableToWithdraw
      );
    };
    return (
      <form className="dialog__bottom" id="follow-create-account">
        <div className="dialog-field">
          <GVFormikField
            name="initialDepositCurrency"
            component={GVTextField}
            label={t("follow-program.create-account.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyFrom}
          >
            {wallets.map((wallet: WalletData) => (
              <option value={wallet.currency} key={wallet.currency}>
                <img
                  src={filesService.getFileUrl(wallet.logo)}
                  className="transfer-popup__icon"
                  alt={wallet.currency}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            ))}
          </GVFormikField>
        </div>
        <div className="dialog-field">
          <StatisticItem label={t("follow-program.create-account.available")}>
            <NumberFormat
              value={availableToWithdraw}
              suffix={` ${initialDepositCurrency}`}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="dialog-field">
          <InputAmountField
            name="initialDepositAmount"
            label={t("follow-program.create-account.amount")}
            currency={initialDepositCurrency}
            setMax={setMaxAmount}
          />
          {currency !== initialDepositCurrency && (
            <div className="invest-popup__currency">
              <NumberFormat
                value={formatCurrencyValue(
                  convertToCurrency(initialDepositAmount, rate),
                  currency
                )}
                prefix="≈ "
                suffix={` ${currency}`}
                displayType="text"
              />
            </div>
          )}
        </div>
        <div className="dialog__buttons">
          <GVButton
            onClick={this.handleNext}
            className="invest-form__submit-button"
            disabled={disableButton()}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

interface OwnProps {
  minDeposit: number;
  wallets: WalletData[];
  currency: string;
  onClick: (values: CreateAccountFormValues) => void;
}

interface State {
  isPending: boolean;
}

export interface CreateAccountFormValues {
  initialDepositCurrency: AttachToSignalProviderInitialDepositCurrencyEnum;
  initialDepositAmount: number;
  rate: number;
}

type Props = OwnProps &
  InjectedTranslateProps &
  FormikProps<CreateAccountFormValues>;

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik({
    displayName: "follow-create-account",
    mapPropsToValues: (props: { [key: string]: any }) => {
      const { wallets, currency } = props;
      if (!wallets === undefined || wallets.length <= 1) return {};
      let initialDepositCurrency = currency || "GVT";
      if (
        !wallets.find(
          (wallet: any) => wallet.currency === initialDepositCurrency
        )
      ) {
        initialDepositCurrency = wallets[0].currency;
      }
      return { initialDepositCurrency, initialDepositAmount: "", rate: 1 };
    },
    validationSchema: (props: Props) => {
      const getAvailable = (currency: string, rate: number): number => {
        const wallet = props.wallets.find(
          (wallet: WalletData) => wallet.currency === currency
        );
        return convertToCurrency(wallet ? wallet.available : 0, rate);
      };
      return lazy(
        (values: CreateAccountFormValues): Schema<any> =>
          object().shape({
            initialDepositAmount: number()
              .required(
                props.t(
                  "follow-program.create-account.validation.amount-required"
                )
              )
              .moreThan(
                convertFromCurrency(props.minDeposit, values.rate),
                props.t(
                  "follow-program.create-account.validation.amount-more-than-min-deposit",
                  { value: convertFromCurrency(props.minDeposit, values.rate) }
                )
              )
              .max(
                getAvailable(values.initialDepositCurrency, 1),
                props.t(
                  "follow-program.create-account.validation.amount-more-than-available"
                )
              )
          })
      );
    },
    handleSubmit: (values, { props }) => {
      props.onSubmit(
        convertFromCurrency(values.initialDepositAmount!, values.rate || 1)
      );
    }
  })
)(FollowCreateAccount);
