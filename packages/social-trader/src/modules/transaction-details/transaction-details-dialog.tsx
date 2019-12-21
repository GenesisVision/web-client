import "./transaction-details.scss";

import useApiRequest from "hooks/api-request.hook";
import i18next from "i18next";
import CommonTransactionDetails from "modules/transaction-details/transactions/common-transation-details";
import { MultiWalletTransaction } from "pages/wallet/wallet.types";
import * as React from "react";
import { useCallback } from "react";

import {
  cancelWithdrawalRequestMethod,
  resendWithdrawalRequestEmailMethod
} from "./transaction-details.service";

const _TransactionDetailsDialog: React.FC<Props> = ({
  transaction,
  close,
  onAction
}) => {
  const { sendRequest: cancelWithdrawalRequest } = useApiRequest({
    middleware: [onAction],
    request: cancelWithdrawalRequestMethod
  });
  const { sendRequest: resendWithdrawalRequestEmail } = useApiRequest({
    middleware: [close],
    request: resendWithdrawalRequestEmailMethod
  });

  const cancel = useCallback(() => cancelWithdrawalRequest(transaction.id), [
    transaction.id
  ]);

  const resendEmail = useCallback(
    () => resendWithdrawalRequestEmail(transaction.id),
    [transaction.id]
  );

  return (
    <CommonTransactionDetails
      data={transaction}
      handleCancel={cancel}
      handleResend={resendEmail}
    />
  );
};

export interface TransactionDetailsProps extends i18next.WithT {
  data: MultiWalletTransaction;
  handleCancel?: () => void;
  handleResend?: () => void;
}

interface Props {
  transaction: MultiWalletTransaction;
  close: () => void;
  onAction: () => void;
}

const TransactionDetailsDialog = React.memo(_TransactionDetailsDialog);
export default TransactionDetailsDialog;
