import { Button } from "components/button/button";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { SubmitButton } from "components/submit-button/submit-button";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatValue } from "utils/formatter";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";

import { FundWithdrawResult } from "./fund-withdraw-result";
import { withdrawFund } from "./services/fund-withdraw.services";

const _FundWithdrawConfirm: React.FC<IFundWithdrawConfirmProps> = ({
  onApply = () => {},
  onClose,
  id,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  onBackClick
}) => {
  const onCloseMiddleware = postponeCallback(onClose);
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onCloseMiddleware, onApply],
    request: withdrawFund,
    successMessage: "withdraw-fund.success-alert-message"
  });
  const handleSubmit = useCallback(
    () =>
      sendRequest({
        id,
        value: {
          percent,
          currency
        }
      }),
    [percent, currency, id]
  );
  return (
    <FundWithdrawConfirmForm
      errorMessage={errorMessage}
      availableToWithdraw={availableToWithdraw}
      percent={percent}
      currency={currency}
      exitFee={exitFee}
      onSubmit={handleSubmit}
      onBackClick={onBackClick}
    />
  );
};

interface IFundWithdrawConfirmProps {
  onApply?: VoidFunction;
  onClose: (param?: any) => void;
  id: string;
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onBackClick: () => void;
}
export const FundWithdrawConfirm = React.memo(_FundWithdrawConfirm);

const _FundWithdrawConfirmForm: React.FC<Props> = ({
  onSubmit,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  errorMessage,
  onBackClick
}) => {
  const [t] = useTranslation();
  const form = useForm();

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogListItem label={t("withdraw-fund.withdrawing")}>
        {formatValue(percent, 2)} %
      </DialogListItem>
      <FundWithdrawResult
        availableToWithdraw={availableToWithdraw}
        percent={percent}
        currency={currency}
        exitFee={exitFee}
      />
      <DialogError error={errorMessage} />
      <DialogButtons>
        <Button
          onClick={onBackClick}
          color="secondary"
          variant="outlined"
          title={t("buttons.back")}
        >
          {t("buttons.back")}
        </Button>
        <SubmitButton
          checkValid={false}
          checkDirty={false}
          isSuccessful={!errorMessage}
          id="fundWithdrawFormSubmit"
        >
          {t("buttons.confirm")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

interface Props {
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onSubmit: () => void;
  onBackClick: () => void;
}

const FundWithdrawConfirmForm = React.memo(_FundWithdrawConfirmForm);
