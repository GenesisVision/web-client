import { InjectedFormikProps, withFormik } from "formik";
import { CancelablePromise } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import useApiRequest from "shared/hooks/api-request.hook";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

import { IProgramWithdrawAmountFormValues } from "./program-withdraw-amount-form";
import { ProgramWithdrawType } from "./program-withdraw-popup";

const _ProgramWithdrawConfirm: React.FC<ProgramWithdrawConfirmProps> = ({
  withdraw,
  programCurrency,
  formValues,
  periodEnds,
  onBackClick
}) => {
  const { errorMessage, sendRequest } = useApiRequest({
    request: withdraw
  });
  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      sendRequest(formValues, setSubmitting),
    [formValues]
  );

  return (
    <ProgramWithdrawConfirmForm
      errorMessage={errorMessage}
      formValues={formValues}
      onSubmit={handleSubmit}
      onBackClick={onBackClick}
      programCurrency={programCurrency}
      periodEnds={periodEnds}
    />
  );
};
export const ProgramWithdrawConfirm = React.memo(_ProgramWithdrawConfirm);

interface ProgramWithdrawConfirmProps {
  withdraw: (values: ProgramWithdrawType) => CancelablePromise<void>;
  formValues: IProgramWithdrawAmountFormValues;
  onBackClick: () => void;
  periodEnds: Date;
  programCurrency: string;
}

const _ProgramWithdrawConfirmForm: React.FC<InjectedFormikProps<Props, {}>> = ({
  programCurrency,
  formValues: { amount, withdrawAll },
  periodEnds,
  isSubmitting,
  errorMessage,
  handleSubmit,
  onBackClick
}) => {
  const [t] = useTranslation();
  return (
    <form id="withdraw-submit-form" onSubmit={handleSubmit}>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {t("withdraw-program.withdrawing")}
          <span className="dialog-list__value">
            {amount && !withdrawAll
              ? `${formatCurrencyValue(
                  amount,
                  programCurrency
                )} ${programCurrency}`
              : t("withdraw-program.all")}
          </span>
        </li>
        <li className="dialog-list__item">
          {t("withdraw-program.payout-date")}
          <span className="dialog-list__value">
            {moment(periodEnds).format()}
          </span>
        </li>
      </ul>
      <FormError error={errorMessage} />
      <div className="dialog__buttons">
        <GVButton
          onClick={onBackClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {t("withdraw-program.back")}
        </GVButton>
        <GVButton
          title={"submit"}
          type={"submit"}
          id="programWithdrawFormSubmit"
          disabled={isSubmitting}
        >
          {t("withdraw-program.submit")}
        </GVButton>
      </div>
    </form>
  );
};

const ProgramWithdrawConfirmForm = compose<React.ComponentType<Props>>(
  withFormik<Props, {}>({
    displayName: "withdraw-submit-form",
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  }),
  React.memo
)(_ProgramWithdrawConfirmForm);

export default ProgramWithdrawConfirmForm;

interface Props {
  formValues: IProgramWithdrawAmountFormValues;
  errorMessage?: string;
  onSubmit: (setSubmitting: SetSubmittingType) => void;
  onBackClick: () => void;
  periodEnds: Date;
  programCurrency: string;
}
