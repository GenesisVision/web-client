import Modal, { BodyFix } from "components/modal/modal";
import { NextComponentType } from "next";
import Router from "next/router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { $backgroundColor, $mainColor } from "utils/style/colors";

export enum SIDEBAR_POSITION {
  LEFT = "left",
  RIGHT = "right"
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: (event?: React.MouseEvent<HTMLElement>) => void;
  position?: SIDEBAR_POSITION;
}

const SidebarContainer = styled.div<{ position?: SIDEBAR_POSITION }>`
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  width: 400px;
  max-width: 90%;
  background-color: ${$backgroundColor};
  display: flex;
  box-sizing: border-box;
  color: ${$mainColor};
  -webkit-overflow-scrolling: touch;
  ${({ position }) => {
    switch (position) {
      case SIDEBAR_POSITION.LEFT:
        return "left: 0;";
      case SIDEBAR_POSITION.RIGHT:
        return "right: 0;";
    }
  }}
`;

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
      <SidebarContainer position={position}>{children}</SidebarContainer>
    </Modal>
  );
};

const Sidebar = React.memo(_Sidebar);
export default Sidebar;
