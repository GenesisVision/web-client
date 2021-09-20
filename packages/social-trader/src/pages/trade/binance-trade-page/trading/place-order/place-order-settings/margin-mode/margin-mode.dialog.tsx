import { Accordion } from "components/accordion/accordion";
import { Button } from "components/button/button";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { GvButtonWithMark } from "components/gv-button/gv-button-with-mark/gv-button-with-mark";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { getSymbolFromState } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { MarginModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onClose?: VoidFunction;
  onChange: (mode: MarginModeType) => void;
  mode: MarginModeType;
}

export const MarginModeDialog: React.FC<Props & IDialogOuterProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <MarginModeDialogContent {...props} />
    </Dialog>
  );
};

const MarginModeDialogContent: React.FC<Props> = ({
  onClose,
  mode: modeProp,
  onChange
}) => {
  const [mode, setMode] = useState<MarginModeType>(modeProp);
  const { symbol } = useContext(TerminalInfoContext);
  const [t] = useTranslation();
  const handleClickButton = useCallback(
    (mode: MarginModeType) => () => {
      setMode(mode);
    },
    []
  );
  const handleChange = useCallback(() => {
    onChange(mode);
    onClose && onClose();
  }, [mode, onChange]);

  const symbolName = getSymbolFromState(symbol);
  return (
    <>
      <DialogTop title={t(`${symbolName} Margin mode`)} />
      <DialogBottom>
        <Row>
          <RowItem wide>
            <GvButtonWithMark
              disabled={mode === "Cross"}
              wide
              onClick={handleClickButton("Cross")}
              selected={mode === "Cross"}
            >
              {t("Cross")}
            </GvButtonWithMark>
          </RowItem>
          <RowItem wide>
            <GvButtonWithMark
              disabled={mode === "Isolated"}
              wide
              onClick={handleClickButton("Isolated")}
              selected={mode === "Isolated"}
            >
              {t("Isolated")}
            </GvButtonWithMark>
          </RowItem>
        </Row>
        <Row>
          <Text muted>
            {t(
              "· Switching the margin mode will only apply it to the selected contract."
            )}
          </Text>
        </Row>
        <Row>
          <Button disabled={mode === modeProp} wide onClick={handleChange}>
            {t("Confirm")}
          </Button>
        </Row>
        <Row>
          <Accordion
            label={<Text muted>{t("What are Cross and Isolated modes?")}</Text>}
            text={
              <Text>
                {t(
                  "Cross Margin Mode: Share your margin balance across all open positions to avoid liquidation. In the event of liquidation you risk losing your full margin balance along with any remaining open positions.\n" +
                    "\n" +
                    "Isolated Margin Mode: Manage your risk on individual positions by restricting the amount of margin allocated to each. If the margin ratio of a position reached 100%, the position will be liquidated. Margin can be added or removed to positions using this mode."
                )}
              </Text>
            }
          />
        </Row>
      </DialogBottom>
    </>
  );
};
