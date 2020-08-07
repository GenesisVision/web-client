import Dialog, { IDialogProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

const ConfirmPopupContent = dynamic(() =>
  import("components/confirm-popup/confirm-popup-content")
);

export interface Props extends IDialogProps {
  errorMessage?: string;
  onApply: () => void;
  onCancel?: () => void;
  header?: string;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  disabled?: boolean;
}

const _ConfirmPopup: React.FC<Props> = props => {
  const { open, onClose, className } = props;
  return (
    <Dialog open={open} onClose={onClose} className={className}>
      <ConfirmPopupContent {...props} />
    </Dialog>
  );
};

const ConfirmPopup = React.memo(_ConfirmPopup);
export default ConfirmPopup;
