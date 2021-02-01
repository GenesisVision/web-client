import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { TerminalCurrency } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TransferForm } from "pages/trade/binance-trade-page/trading/transfer/transfer-form";
import { TransferFormValues } from "pages/trade/binance-trade-page/trading/transfer/transfer.helpers";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

export interface ITransferContainerProps {
  onApply: VoidFunction;
  asset: TerminalCurrency;
}

const _TransferContainer: React.FC<ITransferContainerProps> = ({
  onApply,
  asset
}) => {
  const [t] = useTranslation();
  const { getBalancesForTransfer, newFutureAccountTransfer } = useContext(
    TerminalMethodsContext
  );
  const { exchangeAccountId, symbol } = useContext(TerminalInfoContext);
  const { sendRequest: sendTransfer, status } = useApiRequest({
    request: newFutureAccountTransfer!,
    successMessage: "Success",
    middleware: [postponeCallback(onApply)]
  });
  const { data } = useApiRequest({
    request: getBalancesForTransfer!,
    fetchOnMount: true,
    fetchOnMountData: { accountId: exchangeAccountId }
  });

  const handleSubmit = useCallback(
    (values: TransferFormValues) => {
      return sendTransfer({
        ...values
      });
    },
    [symbol]
  );
  return (
    <>
      <DialogTop title={t("Transfer")} />
      <DialogBottom>
        {data && (
          <TransferForm
            asset={asset}
            isSuccessful={status === "SUCCESS"}
            data={data}
            onSubmit={handleSubmit}
          />
        )}
      </DialogBottom>
    </>
  );
};

const TransferContainer = React.memo(_TransferContainer);
export default TransferContainer;
