import "./sidebar.scss";

import * as classNames from "classnames";
import * as React from "react";
import Modal from "shared/components/modal/modal";

export enum SIDEBAR_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

interface ISidebarProps {
  open: boolean;
  onClose?(event: React.MouseEvent<HTMLElement>): void;
  position: SIDEBAR_POSITION;
}

class Sidebar extends React.Component<ISidebarProps> {
  render() {
    const { open, onClose, position, children } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <div
          className={classNames(
            "sidebar",
            `sidebar--${position || SIDEBAR_POSITION.LEFT}`
          )}
        >
          {children}
        </div>
      </Modal>
    );
  }
}

export default Sidebar;
