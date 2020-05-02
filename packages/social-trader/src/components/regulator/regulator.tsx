import classNames from "classnames";
import * as React from "react";
import { PlatformAssetFull } from "utils/types";

import styles from "./regulator.module.scss";

const Regulator: React.FC<Props> = ({
  remainder,
  minValue = 0,
  value,
  handleUp,
  handleDown,
  children
}) => {
  return (
    <div
      className={classNames(styles["regulator"], {
        [styles["regulator--mute"]]: value <= minValue
      })}
    >
      <div
        className={classNames(
          styles["regulator__button"],
          styles["regulator__button--minus"],
          {
            [styles["regulator__button--mute"]]: value <= minValue
          }
        )}
        onClick={handleDown}
      >
        &minus;
      </div>
      <div className={styles["regulator__indicator"]}>{children}</div>
      <div
        className={classNames(
          styles["regulator__button"],
          styles["regulator__button--plus"],
          {
            [styles["regulator__button--mute"]]: remainder <= 0
          }
        )}
        onClick={handleUp}
      >
        +
      </div>
    </div>
  );
};

interface Props {
  remainder: number;
  minValue?: number;
  value: number;
  handleUp: TSymbolClickHandle;
  handleDown: TSymbolClickHandle;
  children: JSX.Element;
}

export type TRegulatorHandle = (asset: PlatformAssetFull) => TSymbolClickHandle;

type TSymbolClickHandle = (event: React.SyntheticEvent<HTMLElement>) => void;

export default Regulator;
