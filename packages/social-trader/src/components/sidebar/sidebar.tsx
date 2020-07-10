import clsx from "clsx";
import Modal, { BodyFix } from "components/modal/modal";
import { NextComponentType } from "next";
import Router from "next/router";
import * as React from "react";
import { useCallback, useEffect } from "react";

import styles from "./sidebar.module.scss";

export enum SIDEBAR_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

const _Sidebar: NextComponentType<{}, {}, Props> = ({
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
      <div className={clsx(styles["sidebar"], styles[`sidebar--${position}`])}>
        {children}
      </div>
    </Modal>
  );
};

const Sidebar = React.memo(_Sidebar);
export default Sidebar;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: (event?: React.MouseEvent<HTMLElement>) => void;
  position?: SIDEBAR_POSITION;
}
