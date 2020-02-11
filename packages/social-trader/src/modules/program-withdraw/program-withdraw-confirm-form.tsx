import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import GVButton from "components/gv-button";
import { InjectedFormikProps, withFormik } from "formik";
import useApiRequest from "hooks/api-request.hook";
import { IProgramWithdrawAmountFormValues } from "modules/program-withdraw/program-withdraw.helpers";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { formatDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { SetSubmittingType } from "utils/types";

import { withdrawProgramById } from "./services/program-withdraw.services";

export const WITHDRAW_FORM_SUBMIT = "programWithdrawFormSubmit";

const _ProgramWithdrawConfirm: React.FC<ProgramWithdrawConfirmProps> = ({
  onApply = () => {},
  onClose,
  id,
  programCurrency,
  formValues,
  periodEnds,
  onBackClick
}) => {
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onClose, onApply],
    request: withdrawProgramById,
    successMessage: "withdraw-program.success-alert-message"
  });
  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      sendRequest({ id, value: formValues }, setSubmitting).then(onClose),
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
  onApply?: VoidFunction;
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
                +amount,
                programCurrency
              )} ${programCurrency}`
            : t("withdraw-program.all")}
        </DialogListItem>
        <DialogListItem label={t("withdraw-program.payout-date")}>
          {formatDate(periodEnds)}
        </DialogListItem>
      </DialogList>
      <DialogError error={errorMessage} />
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
          id={WITHDRAW_FORM_SUBMIT}
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
