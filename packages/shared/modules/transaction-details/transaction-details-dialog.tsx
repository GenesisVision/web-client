import "./transaction-details.scss";

import { TransactionDetails, TransactionDetailsTypeEnum } from "gv-api-web";
import i18next from "i18next";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import ConvertingDetails from "shared/modules/transaction-details/transactions/converting-details";
import ExternalDeposit from "shared/modules/transaction-details/transactions/external-deposit-details";
import ExternalWithdrawal from "shared/modules/transaction-details/transactions/external-withdrawal-details";
import FeeDetails from "shared/modules/transaction-details/transactions/fee-details";
import InvestingTransaction from "shared/modules/transaction-details/transactions/investment-details";
import OpenCloseTransaction from "shared/modules/transaction-details/transactions/open-close-details";
import ProfitDetails from "shared/modules/transaction-details/transactions/profit-details";
import SignalTransaction from "shared/modules/transaction-details/transactions/signal-details";
import WithdrawalTransaction from "shared/modules/transaction-details/transactions/withdrawal-details";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { ResponseError } from "shared/utils/types";

const _TransactionDetailsDialog: React.FC<Props> = ({
  transactionId,
  close,
  onAction
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  const [data, setData] = useState<TransactionDetails | undefined>(undefined);
  useEffect(() => {
    setIsPending();
    walletApi
      .getTransactionDetails(transactionId, authService.getAuthArg())
      .then(setData)
      .catch(({ errorMessage }: ResponseError) =>
        dispatch(alertMessageActions.error(errorMessage))
      )
      .finally(setIsNotPending);
  }, [transactionId]);

  const cancel = useCallback(() => {
    walletApi
      .cancelWithdrawalRequest(transactionId, authService.getAuthArg())
      .then(onAction)
      .catch(({ errorMessage }: ResponseError) =>
        dispatch(alertMessageActions.error(errorMessage))
      );
  }, [transactionId]);

  const resendEmail = useCallback(() => {
    walletApi
      .resendWithdrawalRequestEmail(transactionId, authService.getAuthArg())
      .then(close)
      .catch(({ errorMessage }: ResponseError) =>
        dispatch(alertMessageActions.error(errorMessage))
      );
  }, [transactionId]);

  if (isPending || !data) return <DialogLoader />;
  const Component = Types[data.type] || (() => <p>type isn't define</p>);

  return (
    <Component
      t={t}
      data={data}
      handleCancel={cancel}
      handleResend={resendEmail}
    />
  );
};

const Types: TransactionTypes = {
  Investing: InvestingTransaction,
  Withdrawal: WithdrawalTransaction,
  Open: OpenCloseTransaction,
  Close: OpenCloseTransaction,
  ExternalDeposit: ExternalDeposit,
  ExternalWithdrawal: ExternalWithdrawal,
  Converting: ConvertingDetails,
  Profit: ProfitDetails,
  PlatformFee: FeeDetails,
  SubscribeSignal: SignalTransaction,
  ReceiveSignal: SignalTransaction,
  DepositSignal: SignalTransaction,
  WithdrawalSignal: SignalTransaction,
  Platform: SignalTransaction
} as TransactionTypes;

type TransactionTypes = {
  [name in TransactionDetailsTypeEnum]:
    | React.FC<TransactionDetailsProps>
    | React.ExoticComponent<TransactionDetailsProps>;
};

export interface TransactionDetailsProps extends i18next.WithT {
  data: TransactionDetails;
  handleCancel?: () => void;
  handleResend?: () => void;
}

interface Props {
  transactionId: string;
  close: () => void;
  onAction: () => void;
}

const TransactionDetailsDialog = React.memo(_TransactionDetailsDialog);
export default TransactionDetailsDialog;
