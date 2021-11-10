import { Button } from "components/button/button";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import { Slider } from "components/range/range";
import Regulator from "components/regulator/regulator";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { TerminalPlaceOrderContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-place-order.context";
import { LeverageBracket } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useTranslation } from "react-i18next";

import { TerminalFuturesPositionsContext } from "../../../contexts/terminal-futures-positions.context";
import styles from "./change-leverage.module.scss";

interface Props {
  leverageBrackets: LeverageBracket[];
  maxLeverage: number;
  onClose?: VoidFunction;
  onChange: (leverage: number) => void;
  leverage: number;
}

const COUNT_STEPS = 5;

const generateLeverageMarks = (max: number): { [keys: number]: string } => {
  const marksStepSize = max / COUNT_STEPS;
  const list = Array(Math.floor(max / marksStepSize))
    .fill("")
    .map((item, i) => (i + 1) * marksStepSize)
    .map(value => ({ name: value, value: `${value}x` }))
    .reduce(
      (acc, n) => ((acc[n.name] = n.value), acc),
      {} as { [keys: number]: string }
    );
  return {
    1: "1x",
    ...list
  };
};

export const ChangeLeverageDialog: React.FC<
  Props & IDialogOuterProps
> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <ChangeLeverageDialogContent {...props} />
    </Dialog>
  );
};

const ChangeLeverageDialogContent: React.FC<Props> = ({
  leverageBrackets,
  maxLeverage,
  onClose,
  leverage: leverageProp,
  onChange
}) => {
  const [t] = useTranslation();
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const hasPositions = !!openPositions.length;

  const RANGE_MARKS = useMemo(() => generateLeverageMarks(maxLeverage), [
    maxLeverage
  ]);
  const [leverage, setLeverage] = useState<number>(leverageProp);
  const [reductionError, setReductionError] = useState(false);

  const { marginMode, setBracket, bracket } = useContext(
    TerminalPlaceOrderContext
  );

  useEffect(() => {
    const bracket = [...leverageBrackets]
      .reverse()
      .find(({ initialLeverage }) => {
        return leverage <= initialLeverage;
      });
    setBracket(bracket);
  }, [leverage]);

  useEffect(() => {
    if (hasPositions && leverage < leverageProp && marginMode === "Isolated") {
      setReductionError(true);
    } else {
      setReductionError(false);
    }
  }, [leverage]);

  const handleClickRegulator = useCallback(
    (value: number) => () => {
      setLeverage(leverage + value);
    },
    [leverage]
  );
  const handleChangeSlider = useCallback(
    (index: number) => {
      setLeverage(index);
    },
    [leverage]
  );
  const handleChange = useCallback(() => {
    onChange(leverage);
    onClose && onClose();
  }, [leverage, onChange]);

  return (
    <>
      <DialogTop title={t("Adjust leverage")} />
      <DialogBottom>
        <Row className={styles["change-leverage__regulator"]}>
          <Regulator
            size={"middle"}
            remainder={maxLeverage - leverage}
            minValue={1}
            value={leverage}
            handleDown={handleClickRegulator(-1)}
            handleUp={handleClickRegulator(+1)}
          >
            {<>{leverage} x</>}
          </Regulator>
        </Row>
        <Row wide onlyOffset>
          <Slider
            min={1}
            step={1}
            max={maxLeverage}
            marks={RANGE_MARKS}
            value={leverage}
            onChange={handleChangeSlider}
          />
        </Row>
        <Row>
          <Text muted>
            {t(
              `Maximum position at current leverage ${
                bracket?.notionalCap || 0
              } USDT`
            )}
          </Text>
        </Row>
        {reductionError && (
          <Row>
            <FormError
              small
              error={t(
                "Leverage reduction is not supported in Isolated Margin Mode with open positions"
              )}
            />
          </Row>
        )}
        <Row>
          <Button
            disabled={leverage === leverageProp || reductionError}
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
