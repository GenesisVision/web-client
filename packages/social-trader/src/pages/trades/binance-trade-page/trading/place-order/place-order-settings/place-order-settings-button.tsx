import GVButton from "components/gv-button";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const _PlaceOrderSettingsButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <GVButton
      noPadding={false}
      size={"xsmall"}
      variant={"outlined"}
      onClick={onClick}
    >
      {children}
    </GVButton>
  );
};

export const PlaceOrderSettingsButton = React.memo(_PlaceOrderSettingsButton);
