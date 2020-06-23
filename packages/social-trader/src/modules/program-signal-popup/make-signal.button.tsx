import Dialog from "components/dialog/dialog";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const ProgramSignalForm = dynamic(() =>
  import("./components/program-signal-form")
);

const _MakeSignalButton: React.FC<Props> = ({ id, programName, onApply }) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const handleOnApply = useCallback(() => {
    setIsClosePopup();
    onApply && onApply();
  }, []);
  return (
    <>
      <TableCardActionsItem onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-signal")}
      </TableCardActionsItem>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <ProgramSignalForm
          id={id}
          onApply={handleOnApply}
          programName={programName}
        />
      </Dialog>
    </>
  );
};

interface Props {
  id: string;
  programName: string;
  onApply?: VoidFunction;
}
const MakeSignalButton = React.memo(_MakeSignalButton);
export default MakeSignalButton;
