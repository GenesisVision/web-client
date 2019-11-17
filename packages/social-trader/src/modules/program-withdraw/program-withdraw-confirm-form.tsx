import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogList } from "shared/components/dialog/dialog-list";
import { DialogListItem } from "shared/components/dialog/dialog-list-item";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import useApiRequest from "shared/hooks/api-request.hook";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

import { IProgramWithdrawAmountFormValues } from "./program-withdraw-amount-form";
import { withdrawProgramById } from "./services/program-withdraw.services";

const _ProgramWithdrawConfirm: React.FC<ProgramWithdrawConfirmProps> = ({
  onClose,
  id,
  programCurrency,
  formValues,
  periodEnds,
  onBackClick
}) => {
  const { errorMessage, sendRequest } = useApiRequest({
    request: withdrawProgramById,
    successMessage: "withdraw-program.success-alert-message"
  });
  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      sendRequest({ id, values: formValues }, setSubmitting).then(onClose),
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
  id: string;
  onClose: (param?: any) => void;
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
      <DialogList>
        <DialogListItem label={t("withdraw-program.withdrawing")}>
          {amount && !withdrawAll
            ? `${formatCurrencyValue(
                amount,
                programCurrency
              )} ${programCurrency}`
            : t("withdraw-program.all")}
        </DialogListItem>
        <DialogListItem label={t("withdraw-program.payout-date")}>
          {formatDate(periodEnds)}
        </DialogListItem>
      </DialogList>
      <FormError error={errorMessage} />
      <DialogButtons>
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
      </DialogButtons>
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
