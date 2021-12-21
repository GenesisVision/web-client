import clsx from "clsx";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./place-order-info-row.module.scss";

interface ILabeledValue {
  label: string;
  value: string;
}

export const PlaceOrderLabeledValue: React.FC<ILabeledValue> = ({
  label,
  value
}) => {
  return (
    <>
      <Text className={styles["truncated"]} muted>
        {label}
      </Text>
      <Text className={clsx(styles["truncated"], styles["content"])}>
        {value}
      </Text>
    </>
  );
};

interface IInfoRow {
  left: React.ReactElement<ILabeledValue>;
  right: React.ReactElement<ILabeledValue>;
  size?: SizesType;
}

export const PlaceOrderInfoRow: React.FC<IInfoRow> = ({
  left,
  right,
  size
}) => {
  return (
    <Row center={false} size={size} spaceBetween wrap>
      <div className={clsx(styles["row-block"], styles["row-block__left"])}>
        {left}
      </div>
      <div className={clsx(styles["row-block"], styles["row-block__right"])}>
        {right}
      </div>
    </Row>
  );
};
