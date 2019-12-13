import Dialog from "components/dialog/dialog";
import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import ProgramSignalForm from "./components/program-signal-form";

const _ProgramSignalPopup: React.FC<Props> = ({
  id,
  programName,
  successFee,
  volumeFee,
  onApply
}) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const handleOnApply = useCallback(() => {
    setIsClosePopup();
    onApply();
  }, []);
  return (
    <>
      <GVButton color="secondary" variant="text" onClick={setIsOpenPopup}>
        {t("Make signal")}
      </GVButton>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <ProgramSignalForm
          id={id}
          onApply={handleOnApply}
          programName={programName}
          successFee={successFee}
          volumeFee={volumeFee}
        />
      </Dialog>
    </>
  );
};

interface Props {
  id: string;
  programName: string;
  successFee: number;
  volumeFee: number;
  onApply: VoidFunction;
}
const ProgramSignalPopup = React.memo(_ProgramSignalPopup);
export default ProgramSignalPopup;
