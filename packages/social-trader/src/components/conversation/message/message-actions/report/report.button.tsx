import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { TEvent } from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ReportDialog } from "./report.dialog";

interface Props {
  clearAnchor: (event?: TEvent) => void;
  label?: string;
  id: string;
  onApply: VoidFunction;
}

export const _ReportButton: React.FC<Props> = ({
  clearAnchor,
  label,
  id,
  onApply
}) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    console.log("handleOnApply");
    handleClose();
  }, []);

  const handleClose = useCallback(() => {
    setIsClose();
    clearAnchor();
  }, []);

  return (
    <>
      <TableCardActionsItem onClick={() => setIsOpen()}>
        {label || t("Report")}
      </TableCardActionsItem>
      <ReportDialog
        open={isOpen}
        onClose={handleClose}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

export const ReportButton = React.memo(_ReportButton);
