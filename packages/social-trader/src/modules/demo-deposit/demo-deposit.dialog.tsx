import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { IDemoDepositContainerProps } from "modules/demo-deposit/demo-deposit.container";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

const DemoDepositContainer = dynamic(() =>
  import("modules/demo-deposit/demo-deposit.container")
);

export const DemoDepositDialog: React.FC<IDemoDepositDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DemoDepositContainer {...props} />
    </Dialog>
  );
};

export interface IDemoDepositDialogProps
  extends IDialogOuterProps,
    IDemoDepositContainerProps {}
