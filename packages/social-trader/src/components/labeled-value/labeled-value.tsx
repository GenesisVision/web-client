import classNames from "classnames";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./labeled-value.module.scss";

export type LabeledValueDirection = "column" | "row";

export interface ILabeledValueProps {
  direction?: LabeledValueDirection;
  label: string | React.ReactNode | JSX.Element;
  size?: SizesType;
}

export const LabeledValue: React.FC<ILabeledValueProps> = ({
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
      <Row
        onlyOffset
        small={size === "small" && direction !== "row"}
        middle={size === "middle" && direction !== "row"}
        large={size === "large" && direction !== "row"}
        xlarge={size === "xlarge" && direction !== "row"}
      >
        <Text wrap={false} muted size={size}>
          {label}
        </Text>
      </Row>
      <Row
        onlyOffset
        small={size === "small" && direction !== "row"}
        middle={size === "middle" && direction !== "row"}
        large={size === "large" && direction !== "row"}
        xlarge={size === "xlarge" && direction !== "row"}
      >
        {children}
      </Row>
    </div>
  );
};
