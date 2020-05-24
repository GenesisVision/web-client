import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import { RadioButton } from "components/radio-button/radio-button";
import { Row } from "components/row/row";
import { PositionModeType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onClose?: VoidFunction;
  onChange: (mode: PositionModeType) => void;
  mode: PositionModeType;
}

export const PositionModeDialog: React.FC<Props &
  IDialogOuterProps> = props => {
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
  const [mode, setMode] = useState<PositionModeType>(modeProp);
  const [t] = useTranslation();
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
          <MutedText noWrap={false}>
            {t(
              "If there are open positions or open orders in the contract, you are not allowed to adjust the position mode. Position mode adjustments are effective for all contracts."
            )}
          </MutedText>
        </Row>
        <Row>
          <MutedText noWrap={false}>
            {t("This setting is only apply for Perpetual Futures.")}
          </MutedText>
        </Row>
        <Row>
          <RadioButton
            selected={mode === false}
            onClick={handleClickButton(false)}
            label={t("One-way Mode")}
          />
        </Row>
        <Row>
          <MutedText noWrap={false}>
            {t(
              "In the One-way Mode, one contract can only hold positions in one direction."
            )}
          </MutedText>
        </Row>
        <Row>
          <RadioButton
            selected={mode === true}
            onClick={handleClickButton(true)}
            label={t("Hedge Mode")}
          />
        </Row>
        <Row>
          <MutedText noWrap={false}>
            {t(
              "In the Hedge Mode, one contract can hold positions in both long and short directions at the same time, and hedge positions in different directions under the same contract."
            )}
          </MutedText>
        </Row>
        <Row>
          <GVButton disabled={mode === modeProp} wide onClick={handleChange}>
            {t("Confirm")}
          </GVButton>
        </Row>
      </DialogBottom>
    </>
  );
};
