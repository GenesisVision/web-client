import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

const SignupPopup = dynamic(() => import("./signup-popup"));

const SignupDialog: React.FC<Props> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <SignupPopup />
    </Dialog>
  );
};

interface Props extends IDialogOuterProps {}
export default SignupDialog;
