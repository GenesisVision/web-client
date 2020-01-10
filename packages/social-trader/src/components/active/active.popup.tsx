import "./active.scss";

import ActivePopupContainer from "components/active/active.popup.container";
import Dialog, { IDialogProps } from "components/dialog/dialog";
import React from "react";

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
