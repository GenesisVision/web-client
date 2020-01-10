import "./active.scss";

import Dialog, { IDialogProps } from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";

const ActivePopupContainer = dynamic(() =>
  import("components/active/active.popup.container")
);

const _ActivePopup: React.FC<Props> = ({ open, onClose, active }) => {
  return (
    <Dialog open={open} onClose={onClose} top>
      <ActivePopupContainer active={active} />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  active: string;
}

const ActivePopup = React.memo(_ActivePopup);
export default ActivePopup;
