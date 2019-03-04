import { InjectedFormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import { ComponentType, Fragment, PureComponent } from "react";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { formatValue } from "shared/utils/formatter";

import FormError from "../form/form-error/form-error";
import { FundWithdraw } from "./fund-withdraw-popup";
import FundWithdrawResult from "./fund-withdraw-result";

interface IFundWithdrawConfirmFormOwnProps {
  availableToWithdraw: number;
  enteredValue: FundWithdraw;
  exitFee: number;
  isPending: boolean;
  errorMessage?: string;
  onSubmit(): void;
  onBackClick(): void;
}

interface IFundWithdrawConfirmFormProps
  extends InjectedTranslateProps,
    IFundWithdrawConfirmFormOwnProps {}

class FundWithdrawConfirmForm extends PureComponent<
  InjectedFormikProps<IFundWithdrawConfirmFormProps, {}>
> {
  render() {
    const {
      t,
      availableToWithdraw,
      enteredValue,
      exitFee,
      isPending,
      errorMessage,
      handleSubmit,
      onBackClick
    } = this.props;

    return (
      <form id="withdraw-submit-form" onSubmit={handleSubmit}>
        <div className="dialog-list__item">
          {t("withdraw-fund.withdrawing")}
          <span className="dialog-list__value">
            {formatValue(enteredValue.percent, 2)} %
          </span>
        </div>
        <FundWithdrawResult
          availableToWithdraw={availableToWithdraw}
          percent={enteredValue.percent}
          currency={enteredValue.currency}
          exitFee={exitFee}
        />
        <div className="form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            onClick={onBackClick}
            color="secondary"
            variant="outlined"
            title={t("buttons.back")}
          >
            {t("buttons.back")}
          </GVButton>
          <GVButton
            type="submit"
            id="fundWithdrawFormSubmit"
            disabled={isPending}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<ComponentType<IFundWithdrawConfirmFormOwnProps>>(
  translate(),
  withFormik<IFundWithdrawConfirmFormProps, {}>({
    displayName: "withdraw-form",
    handleSubmit: (_, { props }) => {
      props.onSubmit();
    }
  })
)(FundWithdrawConfirmForm);
