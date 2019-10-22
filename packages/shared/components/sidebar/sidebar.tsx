import "./sidebar.scss";

import classNames from "classnames";
import * as React from "react";
import { useEffect } from "react";
import Modal, { BodyFix } from "shared/components/modal/modal";
import history from "shared/utils/history";

const _Sidebar: React.FC<Props> = ({
  open,
  onClose,
  position = SIDEBAR_POSITION.LEFT,
  children
}) => {
  useEffect(() => {
    history.listen(() => {
      if (onClose && open) {
        onClose();
      }
    });
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <BodyFix />
      <div className={classNames("sidebar", `sidebar--${position}`)}>
        {children}
      </div>
    </Modal>
  );
};

const Sidebar = React.memo(_Sidebar);
export default Sidebar;

export enum SIDEBAR_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: (event?: React.MouseEvent<HTMLElement>) => void;
  position?: SIDEBAR_POSITION;
}
