import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import GVButton from "components/gv-button";
import useApiRequest from "hooks/api-request.hook";
import { IProgramWithdrawAmountFormValues } from "modules/program-withdraw/program-withdraw.helpers";
import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { getPostponedOnCallback, HookForm } from "utils/hook-form.helpers";

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
  const onCloseMiddleware = getPostponedOnCallback(onClose);
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onCloseMiddleware, onApply],
    request: withdrawProgramById,
    successMessage: "withdraw-program.success-alert-message"
  });
  const handleSubmit = useCallback(
    () => sendRequest({ id, value: formValues }),
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

const _ProgramWithdrawConfirmForm: React.FC<Props> = ({
  onSubmit,
  programCurrency,
  formValues: { amount, withdrawAll },
  periodEnds,
  errorMessage,
  onBackClick
}) => {
  const [t] = useTranslation();

  const form = useForm();
  const {
    formState: { isSubmitted, isSubmitting }
  } = form;
  return (
    <HookForm form={form} onSubmit={onSubmit}>
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
          isSuccessful={isSubmitted && !errorMessage}
          isPending={isSubmitting}
          title={"submit"}
          type={"submit"}
          id={WITHDRAW_FORM_SUBMIT}
          disabled={isSubmitting}
        >
          {t("withdraw-program.submit")}
        </GVButton>
      </DialogButtons>
    </HookForm>
  );
};

interface Props {
  formValues: IProgramWithdrawAmountFormValues;
  errorMessage?: string;
  onSubmit: (e: any) => void;
  onBackClick: () => void;
  periodEnds: Date;
  programCurrency: string;
}

const ProgramWithdrawConfirmForm = React.memo(_ProgramWithdrawConfirmForm);
export default ProgramWithdrawConfirmForm;
