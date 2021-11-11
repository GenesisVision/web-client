import { Button } from "components/button/button";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import { RadioButton } from "components/radio-button/radio-button";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { PositionModeType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { TerminalFuturesPositionsContext } from "../../../contexts/terminal-futures-positions.context";
import { TerminalOpenOrdersContext } from "../../../contexts/terminal-open-orders.context";

interface Props {
  onClose?: VoidFunction;
  onChange: (mode: PositionModeType) => void;
  mode: PositionModeType;
}

export const PositionModeDialog: React.FC<
  Props & IDialogOuterProps
> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <PositionModeDialogContent {...props} />
    </Dialog>
  );
};

const PositionModeDialogContent: React.FC<Props> = ({
  onClose,
  mode: modeProp,
  onChange
}) => {
  const [t] = useTranslation();
  const [mode, setMode] = useState<PositionModeType>(modeProp);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { openOrders } = useContext(TerminalOpenOrdersContext);

  const hasPositions = !!openPositions.length;
  const hasOrders = !!openOrders.length;

  const handleClickButton = useCallback(
    (mode: PositionModeType) => () => {
      setMode(mode);
    },
    []
  );
  const handleChange = useCallback(() => {
    onChange(mode);
    onClose && onClose();
  }, [mode, onChange]);

  return (
    <>
      <DialogTop title={t("Position mode")} />
      <DialogBottom>
        <Row>
          <Text muted>
            {t(
              "If there are open positions or open orders in the contract, you are not allowed to adjust the position mode. Position mode adjustments are effective for all contracts."
            )}
          </Text>
        </Row>
        <Row>
          <Text>{t("This setting only applies to USDⓈ-M Futures.")}</Text>
        </Row>
        <Row>
          <RadioButton
            selected={mode === "OneWay"}
            onClick={handleClickButton("OneWay")}
            label={t("One-way Mode")}
          />
        </Row>
        <Row>
          <Text>
            {t(
              "In the One-way Mode, one contract can only hold positions in one direction."
            )}
          </Text>
        </Row>
        <Row>
          <RadioButton
            selected={mode === "Hedge"}
            onClick={handleClickButton("Hedge")}
            label={t("Hedge Mode")}
          />
        </Row>
        <Row>
          <Text>
            {t(
              "In the Hedge Mode, one contract can hold positions in both long and short directions at the same time, and hedge positions in different directions under the same contract."
            )}
          </Text>
        </Row>
        {(hasPositions || hasOrders) && (
          <Row>
            <FormError
              small
              error={t(
                "Position mode cannot be adjusted if there are open orders or positions"
              )}
            />
          </Row>
        )}
        <Row>
          <Button
            disabled={mode === modeProp || hasPositions || hasOrders}
            wide
            onClick={handleChange}
          >
            {t("Confirm")}
          </Button>
        </Row>
      </DialogBottom>
    </>
  );
};
