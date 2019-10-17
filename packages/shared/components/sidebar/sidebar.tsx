import "./sidebar.scss";

import classnames from "classnames";
import { NextComponentType } from "next";
import Router from "next/router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import Modal, { BodyFix } from "shared/components/modal/modal";

const Sidebar: NextComponentType<{}, {}, Props> = ({
  open,
  onClose,
  position = SIDEBAR_POSITION.LEFT,
  children
}) => {
  const handleRouteChange = useCallback(() => {
    if (onClose && open) {
      onClose();
    }
  }, [onClose, open]);

  useEffect(() => {
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => Router.events.off("routeChangeStart", handleRouteChange);
  }, [open, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <BodyFix />
      <div className={classnames("sidebar", `sidebar--${position}`)}>
        {children}
      </div>
    </Modal>
  );
};

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
