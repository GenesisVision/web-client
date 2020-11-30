import { CalculatorIcon } from "components/icon/calculator-icon";
import Crashable from "decorators/crashable";
import useIsOpen from "hooks/is-open.hook";
import LevelCalculatorPopupContainer from "modules/level-calculator/components/level-calculator-popup.container";
import {
  LevelCalculatorPopupDialog,
  LevelCalculatorPopupOpenButton
} from "modules/level-calculator/components/level-calculator-popup.styles";
import { ILevelCalculatorProps } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";

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
      <LevelCalculatorPopupOpenButton onClick={setOpen}>
        <CalculatorIcon primary={isOpen} />
      </LevelCalculatorPopupOpenButton>

      <LevelCalculatorPopupDialog
        showClose={false}
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
      </LevelCalculatorPopupDialog>
    </>
  );
};

const LevelCalculator = React.memo(Crashable(_LevelCalculator));
export default LevelCalculator;
