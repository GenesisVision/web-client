import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import {
  BinanceFuturesMarginChangeDirectionType,
  BinancePositionSide
} from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import React, { useCallback, useContext } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import { TerminalFuturesBalanceContext } from "../../contexts/terminal-futures-balance.context";
import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalMethodsContext } from "../../contexts/terminal-methods.context";
import AddMarginForm from "./add-margin-form";
import {
  ADJUST_MARGIN_FORM_FIELDS,
  IAdjustMarginDefaultFormValues
} from "./adjust-margin.helpers";
import RemoveMarginForm from "./remove-margin-form";

interface Props {
  quoteAsset: string;
  tickSize: string;
  positionSide: BinancePositionSide;
  entryPrice: number;
  markPrice: number;
  leverage: number;
  maintAmount: number;
  maintMarginRate: number;
  maintMargin: number;
  quantity: number;
  symbol: string;
  margin: number;
  onClose: () => void;
}

const _AdjustMarginPopup: React.FC<Props> = ({
  tickSize,
  quoteAsset,
  onClose,
  margin,
  symbol,
  leverage,
  maintMargin,
  markPrice,
  maintAmount,
  maintMarginRate,
  entryPrice,
  quantity,
  positionSide
}) => {
  const { adjustMargin } = useContext(TerminalMethodsContext);
  const { exchangeAccountId } = useContext(TerminalInfoContext);
  const { availableBalance } = useContext(TerminalFuturesBalanceContext);

  const { tab, setTab } = useTab<BinanceFuturesMarginChangeDirectionType>(
    "Add"
  );
  const { sendRequest, status } = useApiRequest({
    request: adjustMargin!,
    middleware: [postponeCallback(onClose)]
  });

  const handleSubmit = useCallback(
    (values: IAdjustMarginDefaultFormValues) => {
      return sendRequest({
        positionSide,
        accountId: exchangeAccountId,
        symbol,
        type: tab,
        amount: +values[ADJUST_MARGIN_FORM_FIELDS.amount]
      });
    },
    [positionSide, exchangeAccountId, tab, symbol]
  );

  return (
    <>
      <DialogTop>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={"Add"} label={"Add margin"} />
          <GVTab value={"Reduce"} label={"Remove margin"} />
        </GVTabs>
      </DialogTop>
      <DialogBottom>
        {tab === "Add" && (
          <AddMarginForm
            quoteAsset={quoteAsset}
            tickSize={tickSize}
            maintAmount={maintAmount}
            maintMarginRate={maintMarginRate}
            positionSide={positionSide}
            entryPrice={entryPrice}
            quantity={quantity}
            symbol={symbol}
            margin={margin}
            onSubmit={handleSubmit}
            status={status}
            availableBalance={availableBalance}
          />
        )}
        {tab === "Reduce" && (
          <RemoveMarginForm
            quoteAsset={quoteAsset}
            tickSize={tickSize}
            maintAmount={maintAmount}
            maintMarginRate={maintMarginRate}
            positionSide={positionSide}
            entryPrice={entryPrice}
            leverage={leverage}
            maintMargin={maintMargin}
            markPrice={markPrice}
            quantity={quantity}
            symbol={symbol}
            margin={margin}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
      </DialogBottom>
    </>
  );
};

const AdjustMarginPopup = React.memo(_AdjustMarginPopup);
export default AdjustMarginPopup;
