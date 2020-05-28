import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest, { API_REQUEST_STATUS } from "hooks/api-request.hook";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import { TransferForm } from "pages/trades/binance-trade-page/trading/transfer/transfer-form";
import { TransferFormValues } from "pages/trades/binance-trade-page/trading/transfer/transfer.helpers";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

export interface ITransferContainerProps {
  onApply: VoidFunction;
  asset: TradeCurrency;
}

const _TransferContainer: React.FC<ITransferContainerProps> = ({
  onApply,
  asset
}) => {
  const [t] = useTranslation();
  const { getBalancesForTransfer, newFutureAccountTransfer } = useContext(
    TerminalMethodsContext
  );
  const { authData, symbol } = useContext(TradingInfoContext);
  const { sendRequest: sendTransfer, status } = useApiRequest({
    request: newFutureAccountTransfer!,
    successMessage: "Success",
    middleware: [postponeCallback(onApply)]
  });
  const { data } = useApiRequest({
    request: getBalancesForTransfer!,
    fetchOnMount: true,
    fetchOnMountData: { authData }
  });

  const handleSubmit = useCallback(
    (values: TransferFormValues) => {
      return sendTransfer({
        authData,
        ...values
      });
    },
    [symbol, authData]
  );
  return (
    <>
      <DialogTop title={t("Transfer")} />
      <DialogBottom>
        {data && (
          <TransferForm
            asset={asset}
            isSuccessful={status === API_REQUEST_STATUS.SUCCESS}
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
