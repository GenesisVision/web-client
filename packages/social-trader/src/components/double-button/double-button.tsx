import { Center } from "components/center/center";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import React from "react";

import styles from "./double-button.module.scss";

export type DoubleButtonSideParams = {
  selected: boolean;
  color?: "primary" | "secondary" | "primary-dark" | "danger";
  enable: boolean;
  handleClick: VoidFunction;
  label: string;
};

interface Props {
  size?: GV_BTN_SIZE;
  first: DoubleButtonSideParams;
  second: DoubleButtonSideParams;
}

const _DoubleButton: React.FC<Props> = ({ size, first, second }) => {
  return (
    <Center className={styles["double-button"]}>
      <GVButton
        color={first.color}
        className={styles["double-button--first"]}
        disabled={!first.enable}
        variant={first.selected ? "contained" : "outlined"}
        size={size}
        onClick={first.handleClick}
      >
        {first.label}
      </GVButton>
      <GVButton
        color={second.color}
        className={styles["double-button--second"]}
        disabled={!second.enable}
        variant={second.selected ? "contained" : "outlined"}
        size={size}
        onClick={second.handleClick}
      >
        {second.label}
      </GVButton>
    </Center>
  );
};

export const DoubleButton = React.memo(_DoubleButton);
