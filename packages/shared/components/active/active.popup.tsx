import "./active.scss";

import React from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";

import ActiveContainer from "./active.container";

const _ActivePopup: React.FC<Props> = ({ open, onClose, active }) => {
  return (
    <Dialog open={open} onClose={onClose} top>
      <div className="active__popup">
        <ActiveContainer active={active} />
      </div>
    </Dialog>
  );
};

interface Props extends IDialogProps {
  active: string;
}

const ActivePopup = React.memo(_ActivePopup);
export default ActivePopup;
