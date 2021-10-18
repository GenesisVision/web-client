import { Button } from "components/button/button";
import styles from "pages/trade/binance-trade-page/trading/place-order/place-order.module.scss";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const _PlaceOrderSettingsButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button
      className={styles["place-order__mini-button"]}
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
