import clsx from "clsx";
import { ButtonIcon } from "components/button-icon/button-icon";
import { ShortArrowSource } from "components/icon/short-arrow/short-arrow.source";
import React from "react";

import styles from "./short-arrow.module.scss";

export type ShortArrowDirectionType = "top" | "right" | "bottom" | "left";

interface Props {
  direction?: ShortArrowDirectionType;
}

const ShortArrow: React.FC<Props> = ({ direction = "right" }) => {
  return (
    <ButtonIcon
      className={clsx({
        [styles["short-arrow__top"]]: direction === "top",
        [styles["short-arrow__right"]]: direction === "right",
        [styles["short-arrow__bottom"]]: direction === "bottom",
        [styles["short-arrow__left"]]: direction === "left"
      })}
    >
      <ShortArrowSource />
    </ButtonIcon>
  );
};

export default ShortArrow;
