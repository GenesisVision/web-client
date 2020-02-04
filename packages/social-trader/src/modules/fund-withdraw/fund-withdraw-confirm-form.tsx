import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import { InjectedFormikProps, withFormik } from "formik";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { formatValue } from "utils/formatter";
import { SetSubmittingType } from "utils/types";

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
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onClose, onApply],
    request: withdrawFund,
    successMessage: "withdraw-fund.success-alert-message"
  });
  const handleSubmit = useCallback(
    (setSubmitting: SetSubmittingType) =>
      sendRequest(
        {
          id,
          value: {
            percent,
            currency
          }
        },
        setSubmitting
      ),
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
      <DialogError error={errorMessage} />
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
  onSubmit: (setSubmitting: SetSubmittingType) => void;
  onBackClick: () => void;
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
