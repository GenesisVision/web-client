import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import rateApi from "shared/services/api-client/rate-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import {
  calculateValueOfEntryFee,
  convertFromCurrency
} from "shared/utils/currency-converter";
import {
  formatCurrencyValue,
  formatValue,
  validateFraction
} from "shared/utils/formatter";
import { number, object } from "yup";

const types = {
  byBalance: { label: "By balance", value: "byBalance" },
  percentage: { label: "Percentage", value: "percentage" },
  fixed: { label: "Fixed", value: "fixed" }
};
class FollowParams extends Component {
  state = {
    rate: null,
    isPending: false
  };

  componentDidMount() {}

  render() {
    const {
      onClick,
      setFieldValue,
      errors,
      isValid,
      dirty,
      values
    } = this.props;
    const { tolerancePercent } = values;
    const setMaxAmount = () => {
      setFieldValue("tolerancePercent", 100);
    };
    const isAllow = values => {
      const { tolerancePercent } = values;
      return tolerancePercent <= 100;
    };
    const disableButton = () => {
      return (
        errors.amount !== undefined ||
        (dirty && !isValid) ||
        tolerancePercent <= 0
      );
    };
    return (
      <form className="dialog__bottom" id="follow-params" onSubmit={() => {}}>
        <div className="dialog__top">
          <div className="dialog-field">
            <GVFormikField
              name="type"
              component={GVTextField}
              label={"Type"}
              InputComponent={Select}
              // onChange={this.onChangeCurrencyFrom}
            >
              {Object.keys(types).map(type => {
                return (
                  <option value={types[type].value} key={types[type].value}>
                    {types[type].label}
                  </option>
                );
              })}
            </GVFormikField>
          </div>
          <div className="dialog-field">
            <InputAmountField
              name="tolerancePercent"
              label={"Tolerance percent"}
              currency={"%"}
              // isAllow={isAllow}
              setMax={setMaxAmount}
            />
          </div>
          <div className="dialog__buttons">
            <GVButton
              onClick={onClick}
              id="signUpFormSubmit"
              className="invest-form__submit-button"
              disabled={disableButton()}
            >
              {"Submit"}
            </GVButton>
          </div>
        </div>
      </form>
    );
  }
}

export default compose(
  translate(),
  withFormik({
    displayName: "follow-params",
    mapPropsToValues: props => {
      return { type: types.byBalance.value, tolerancePercent: "0.5" };
    },
    validationSchema: ({ t, info }) =>
      object().shape({
        tolerancePercent: number()
          .required()
          .max(100)
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
)(FollowParams);
