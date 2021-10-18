import clsx from "clsx";
import { Center } from "components/center/center";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";

import { FuturesPlaceOrderMode } from "../../place-order.types";
import styles from "./place-order-select-hedge-mode.module.scss";

interface Props {
  placeOrderMode?: FuturesPlaceOrderMode;
  setPlaceOrderMode?: (mode: FuturesPlaceOrderMode) => void;
}

const _PlaceOrderSelectHedgeMode: React.FC<Props> = ({
  placeOrderMode,
  setPlaceOrderMode
}) => {
  const [t] = useTranslation();
  return (
    <Center>
      <div
        className={clsx(styles["select-block"], {
          [styles["select-block--active"]]: placeOrderMode === "HedgeOpen"
        })}
        onClick={() => setPlaceOrderMode!("HedgeOpen")}
      >
        <Text size={"small"} weight={"bold"}>
          {t("Open")}
        </Text>
      </div>
      <div
        className={clsx(styles["select-block"], {
          [styles["select-block--active"]]: placeOrderMode === "HedgeClose"
        })}
        onClick={() => setPlaceOrderMode!("HedgeClose")}
      >
        <Text size={"small"} weight={"bold"}>
          {t("Close")}
        </Text>
      </div>
    </Center>
  );
};

export const PlaceOrderSelectHedgeMode = React.memo(_PlaceOrderSelectHedgeMode);
