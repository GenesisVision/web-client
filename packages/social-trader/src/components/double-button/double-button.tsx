import { Center } from "components/center/center";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import React from "react";

import styles from "./double-button.module.scss";

interface Props {
  size?: GV_BTN_SIZE;
  firstEnable: boolean;
  firstHandleClick: VoidFunction;
  firstLabel: string;
  secondEnable: boolean;
  secondHandleClick: VoidFunction;
  secondLabel: string;
}

const _DoubleButton: React.FC<Props> = ({
  size,
  firstEnable,
  firstHandleClick,
  firstLabel,
  secondEnable,
  secondHandleClick,
  secondLabel
}) => {
  return (
    <Center className={styles["double-button"]}>
      <GVButton
        className={styles["double-button--first"]}
        disabled={!firstEnable}
        variant={firstEnable ? "contained" : "outlined"}
        size={size}
        onClick={firstHandleClick}
      >
        {firstLabel}
      </GVButton>
      <GVButton
        className={styles["double-button--second"]}
        disabled={!secondEnable}
        variant={secondEnable ? "contained" : "outlined"}
        size={size}
        onClick={secondHandleClick}
      >
        {secondLabel}
      </GVButton>
    </Center>
  );
};

export const DoubleButton = React.memo(_DoubleButton);
