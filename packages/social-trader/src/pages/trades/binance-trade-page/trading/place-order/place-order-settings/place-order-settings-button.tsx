import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick: VoidFunction;
}

const _PlaceOrderSettingsButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <GVButton
      noPadding={false}
      size={GV_BTN_SIZE.XSMALL}
      variant={"outlined"}
      onClick={onClick}
    >
      {children}
    </GVButton>
  );
};

export const PlaceOrderSettingsButton = React.memo(_PlaceOrderSettingsButton);
