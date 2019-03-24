import "./sidebar.scss";

import classnames from "classnames";
import * as React from "react";
import Modal from "shared/components/modal/modal";
import history from "shared/utils/history";

class Sidebar extends React.PureComponent<Props> {
  componentDidMount() {
    history.listen(() => {
      if (this.props.onClose && this.props.open) {
        this.props.onClose();
      }
    });
  }

  render() {
    const {
      open,
      onClose,
      position = SIDEBAR_POSITION.LEFT,
      children
    } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <div className={classnames("sidebar", `sidebar--${position}`)}>
          {children}
        </div>
      </Modal>
    );
  }
}

export default Sidebar;

export enum SIDEBAR_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

interface Props {
  open: boolean;
  onClose?(event?: React.MouseEvent<HTMLElement>): void;
  position?: SIDEBAR_POSITION;
}
