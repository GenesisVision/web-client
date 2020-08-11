import { Button } from "components/button/button";
import { Center } from "components/center/center";
import React from "react";
import { Sizeable } from "utils/types";

import styles from "./double-button.module.scss";

export type DoubleButtonSideParams = {
  selected: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  enable: boolean;
  handleClick: VoidFunction;
  label: string;
};

interface Props extends Sizeable {
  first: DoubleButtonSideParams;
  second: DoubleButtonSideParams;
}

const _DoubleButton: React.FC<Props> = ({ size, first, second }) => {
  return (
    <Center className={styles["double-button"]}>
      <Button
        color={first.color}
        className={styles["double-button--first"]}
        disabled={!first.enable}
        variant={first.selected ? "contained" : "outlined"}
        size={size}
        onClick={first.handleClick}
      >
        {first.label}
      </Button>
      <Button
        color={second.color}
        className={styles["double-button--second"]}
        disabled={!second.enable}
        variant={second.selected ? "contained" : "outlined"}
        size={size}
        onClick={second.handleClick}
      >
        {second.label}
      </Button>
    </Center>
  );
};

export const DoubleButton = React.memo(_DoubleButton);
