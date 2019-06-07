import { InjectedFormikProps, withFormik } from "formik";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { formatValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

import FormError from "../form/form-error/form-error";
import FundWithdrawResult from "./fund-withdraw-result";

const _FundWithdrawConfirmForm: React.FC<InjectedFormikProps<Props, {}>> = ({
  t,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  isSubmitting,
  errorMessage,
  handleSubmit,
  onBackClick
}) => (
  <form id="withdraw-submit-form" onSubmit={handleSubmit}>
    <div className="dialog-list__item">
      {t("withdraw-fund.withdrawing")}
      <span className="dialog-list__value">{formatValue(percent, 2)} %</span>
    </div>
    <FundWithdrawResult
      availableToWithdraw={availableToWithdraw}
      percent={percent}
      currency={currency}
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
        disabled={isSubmitting}
      >
        {t("buttons.confirm")}
      </GVButton>
    </div>
  </form>
);

interface OwnProps {
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onSubmit(setSubmitting: SetSubmittingType): void;
  onBackClick(): void;
}

interface Props extends InjectedTranslateProps, OwnProps {}

const FundWithdrawConfirmForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, {}>({
    displayName: "withdraw-form",
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  }),
  React.memo
)(_FundWithdrawConfirmForm);
export default FundWithdrawConfirmForm;
