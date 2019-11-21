import "./transaction-details.scss";

import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import i18next from "i18next";
import ConvertingDetails from "modules/transaction-details/transactions/converting-details";
import ExternalDeposit from "modules/transaction-details/transactions/external-deposit-details";
import ExternalWithdrawal from "modules/transaction-details/transactions/external-withdrawal-details";
import FeeDetails from "modules/transaction-details/transactions/fee-details";
import InvestingTransaction from "modules/transaction-details/transactions/investment-details";
import OpenCloseTransaction from "modules/transaction-details/transactions/open-close-details";
import ProfitDetails from "modules/transaction-details/transactions/profit-details";
import SignalTransaction from "modules/transaction-details/transactions/signal-details";
import WithdrawalTransaction from "modules/transaction-details/transactions/withdrawal-details";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useApiRequest from "../../hooks/api-request.hook";
import {
  cancelWithdrawalRequestMethod,
  getTransactionDetailsMethod,
  resendWithdrawalRequestEmailMethod
} from "./transaction-details.service";

const _TransactionDetailsDialog: React.FC<Props> = ({
  transactionId,
  close,
  onAction
}) => {
  const [t] = useTranslation();
  const { data, isPending, sendRequest: getTransactionDetails } = useApiRequest(
    { request: getTransactionDetailsMethod }
  );
  const { sendRequest: cancelWithdrawalRequest } = useApiRequest({
    request: cancelWithdrawalRequestMethod
  });
  const { sendRequest: resendWithdrawalRequestEmail } = useApiRequest({
    request: resendWithdrawalRequestEmailMethod
  });

  useEffect(() => {
    getTransactionDetails(transactionId);
  }, [transactionId]);

  const cancel = useCallback(
    () => cancelWithdrawalRequest(transactionId).then(onAction),
    [transactionId]
  );

  const resendEmail = useCallback(
    () => resendWithdrawalRequestEmail(transactionId).then(close),
    [transactionId]
  );

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
  [name in any]:
    | React.FC<TransactionDetailsProps>
    | React.ExoticComponent<TransactionDetailsProps>;
};

export interface TransactionDetailsProps extends i18next.WithT {
  data: any;
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
