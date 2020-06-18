import classNames from "classnames";
import { Row } from "components/row/row";
import { Text, TextWeight } from "components/text/text";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./labeled-value.module.scss";

export type LabeledValueDirection = "column" | "row";

export interface ILabeledValueProps {
  weight?: TextWeight;
  direction?: LabeledValueDirection;
  label: string | React.ReactNode | JSX.Element;
  size?: SizesType;
}

export const LabeledValue: React.FC<ILabeledValueProps> = ({
  weight,
  direction = "column",
  label,
  size = "middle",
  children
}) => {
  return (
    <div
      className={classNames(styles["labeled-value"], {
        [styles["labeled-value--column"]]: direction === "column",
        [styles["labeled-value--row"]]: direction === "row"
      })}
    >
      <Row onlyOffset>
        <Text wrap={false} muted size={size}>
          {label}
        </Text>
      </Row>
      <Row
        onlyOffset
        small={size === "middle" && direction !== "row"}
        middle={size === "large" && direction !== "row"}
        large={size === "xlarge" && direction !== "row"}
      >
        <Text
          weight={weight}
          sizeValue={size === "middle" ? "14px" : undefined}
        >
          {children}
        </Text>
      </Row>
    </div>
  );
};
