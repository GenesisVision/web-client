import "./regulator.scss";

import classNames from "classnames";
import * as React from "react";
import { PlatformAssetFull } from "utils/types";

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
      className={classNames("regulator", {
        "regulator--mute": value <= minValue
      })}
    >
      <div
        className={classNames("regulator__button regulator__button--minus", {
          "regulator__button--mute": value <= minValue
        })}
        onClick={handleDown}
      >
        &minus;
      </div>
      <div className="regulator__indicator">{children}</div>
      <div
        className={classNames("regulator__button regulator__button--plus", {
          "regulator__button--mute": remainder <= 0
        })}
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
