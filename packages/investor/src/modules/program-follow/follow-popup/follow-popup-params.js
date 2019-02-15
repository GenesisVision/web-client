import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
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
    const { tolerancePercent, type } = values;
    const setMaxTolerancePercent = () => {
      setFieldValue("tolerancePercent", "20");
    };
    const setMaxVolumePercent = () => {
      setFieldValue("volumePercent", "999");
    };
    const setMaxAmountUSDEquivalent = () => {
      setFieldValue("USDEquivalent", "99999");
    };
    /*const isAllow = values => {
      const { tolerancePercent } = values;
      return tolerancePercent <= 100;
    };*/
    const disableButton = () => {
      return (
        errors.amount !== undefined ||
        (dirty && !isValid) ||
        tolerancePercent <= 0
      );
    };
    return (
      <form className="dialog__bottom" id="follow-params" onSubmit={() => {}}>
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
            setMax={setMaxTolerancePercent}
          />
        </div>
        {type === types.percentage.value && (
          <div className="dialog-field">
            <InputAmountField
              name="volumePercent"
              label={"Volume percent"}
              currency={"%"}
              // isAllow={isAllow}
              setMax={setMaxVolumePercent}
            />
          </div>
        )}
        {type === types.fixed.value && (
          <div className="dialog-field">
            <InputAmountField
              name="USDEquivalent"
              label={"USD equivalent"}
              currency={"USD"}
              // isAllow={isAllow}
              setMax={setMaxAmountUSDEquivalent}
            />
          </div>
        )}
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
      </form>
    );
  }
}

export default compose(
  translate(),
  withFormik({
    displayName: "follow-params",
    mapPropsToValues: () => {
      return {
        type: types.byBalance.value,
        tolerancePercent: "0.5",
        USDEquivalent: "100",
        volumePercent: "10"
      };
    },
    validationSchema: ({ t }) =>
      object().shape({
        USDEquivalent: number()
          .min(0)
          .max(99999),
        volumePercent: number()
          .max(999)
          .min(1),
        tolerancePercent: number()
          .required()
          .max(20)
          .min(0.01)
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(FollowParams);
