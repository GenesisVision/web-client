import { IReportContainerProps } from "components/conversation/message/message-actions/report/report.container";
import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

export interface IReportDialogProps
  extends IDialogOuterProps,
    IReportContainerProps {}

const ReportContainer = dynamic(() => import("./report.container"));

export const ReportDialog: React.FC<IReportDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <ReportContainer {...props} />
    </Dialog>
  );
};
