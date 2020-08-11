import { Button } from "components/button/button";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const _PlaceOrderSettingsButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button
      noPadding={false}
      size={"xsmall"}
      variant={"outlined"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const PlaceOrderSettingsButton = React.memo(_PlaceOrderSettingsButton);
