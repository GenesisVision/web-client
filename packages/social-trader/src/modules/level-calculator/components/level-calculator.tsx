import "./level-calculator.scss";

import Dialog from "components/dialog/dialog";
import { CalculatorIcon } from "components/icon/calculator-icon";
import useIsOpen from "hooks/is-open.hook";
import { ILevelCalculatorProps } from "pages/programs/program-details/program-details.types";
import * as React from "react";

import LevelCalculatorPopupContainer from "./level-calculator-popup.container";

const _LevelCalculator: React.FC<ILevelCalculatorProps> = ({
  id,
  title,
  currency,
  levelsParameters,
  isKycConfirmed
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <div className="level-calculator" onClick={setOpen}>
        <CalculatorIcon primary={isOpen} />
      </div>

      <Dialog
        className="level-calculator-popup"
        open={isOpen}
        onClose={setClose}
      >
        <LevelCalculatorPopupContainer
          id={id}
          title={title}
          currency={currency}
          onClose={setClose}
          levelsParameters={levelsParameters}
          isKycConfirmed={isKycConfirmed}
        />
      </Dialog>
    </>
  );
};

const LevelCalculator = React.memo(_LevelCalculator);
export default LevelCalculator;
