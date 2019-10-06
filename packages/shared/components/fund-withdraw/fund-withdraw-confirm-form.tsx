import { InjectedFormikProps, withFormik } from "formik";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import useApiRequest from "shared/hooks/api-request.hook";
import { formatValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

import FundWithdrawResult from "./fund-withdraw-result";
import { FundWithdraw } from "./fund-withdraw.types";

const _FundWithdrawConfirm: React.FC<IFundWithdrawConfirmProps> = ({
  withdraw,
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  onBackClick
}) => {
  const { errorMessage, sendRequest } = useApiRequest({
    request: withdraw
  });
  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      sendRequest(
        {
          percent,
          currency
        },
        setSubmitting
      ),
    [percent, currency]
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
  withdraw: (value: FundWithdraw) => Promise<void>;
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onBackClick: () => void;
}
export const FundWithdrawConfirm = React.memo(_FundWithdrawConfirm);

const _FundWithdrawConfirmForm: React.FC<InjectedFormikProps<Props, {}>> = ({
  availableToWithdraw,
  percent,
  currency,
  exitFee,
  isSubmitting,
  errorMessage,
  handleSubmit,
  onBackClick
}) => {
  const [t] = useTranslation();
  return (
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
      <FormError error={errorMessage} />
      <DialogButtons>
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
      </DialogButtons>
    </form>
  );
};

interface OwnProps {
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
  errorMessage?: string;
  onSubmit(setSubmitting: SetSubmittingType): void;
  onBackClick(): void;
}

interface Props extends OwnProps {}

const FundWithdrawConfirmForm = compose<React.ComponentType<OwnProps>>(
  withFormik<Props, {}>({
    displayName: "withdraw-form",
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  }),
  React.memo
)(_FundWithdrawConfirmForm);
export default FundWithdrawConfirmForm;
