import Dialog from "components/dialog/dialog";
import { CalculatorIcon } from "components/icon/calculator-icon";
import Crashable from "decorators/crashable";
import useIsOpen from "hooks/is-open.hook";
import LevelCalculatorPopupContainer from "modules/level-calculator/components/level-calculator-popup.container";
import dynamic from "next/dynamic";
import { ILevelCalculatorProps } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";

import styles from "./level-calculator.module.scss";

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
      <div className={styles["level-calculator"]} onClick={setOpen}>
        <CalculatorIcon primary={isOpen} />
      </div>

      <Dialog
        showClose={false}
        className={styles["level-calculator-popup"]}
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

const LevelCalculator = React.memo(Crashable(_LevelCalculator));
export default LevelCalculator;
