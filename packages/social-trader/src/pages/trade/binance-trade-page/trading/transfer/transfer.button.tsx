import { Button } from "components/button/button";
import useIsOpen from "hooks/is-open.hook";
import { TerminalCurrency } from "pages/trade/binance-trade-page/trading/terminal.types";
import { TransferDialog } from "pages/trade/binance-trade-page/trading/transfer/transfer.dialog";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  asset: TerminalCurrency;
}

const _TransferButton: React.FC<Props> = ({ asset }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  return (
    <>
      <Button noPadding size={"small"} variant={"text"} onClick={setIsOpen}>
        {t("Transfer")}
      </Button>
      <TransferDialog
        asset={asset}
        open={isOpen}
        onClose={setIsClose}
        onApply={setIsClose}
      />
    </>
  );
};

export const TransferButton = React.memo(_TransferButton);
