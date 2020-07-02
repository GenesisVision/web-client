import clsx from "clsx";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./radio-button.module.scss";

interface Props {
  onClick?: VoidFunction;
  selected: boolean;
  label: string;
  size?: SizesType;
}

const _RadioButton: React.FC<Props> = ({
  onClick,
  selected,
  label,
  size = "middle"
}) => {
  return (
    <Center className={styles["radio-button"]} onClick={onClick}>
      <RowItem
        size={"small"}
        className={clsx(styles["radio-button__round-container"], {
          [styles["radio-button__round-container--middle"]]: size === "middle"
        })}
      >
        <div
          className={clsx(styles["radio-button__round"], {
            [styles["radio-button__round--selected"]]: selected,
            [styles["radio-button__round--middle"]]: size === "middle"
          })}
        >
          <div
            className={clsx(styles["radio-button__selected-mark"], {
              [styles["radio-button__selected-mark--selected"]]: selected
            })}
          />
        </div>
      </RowItem>
      <RowItem
        className={clsx(styles["radio-button__label"], {
          [styles["radio-button__label--middle"]]: size === "middle"
        })}
      >
        {label}
      </RowItem>
    </Center>
  );
};

export const RadioButton = React.memo(_RadioButton);
