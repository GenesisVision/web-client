import "./regulator.scss";

import classNames from "classnames";
import { PlatformAssetFull } from "manager-web-portal/src/pages/funds/fund-settings/reallocation/components/reallocate-field";
import * as React from "react";

const Regulator: React.FC<Props> = ({
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
        className="regulator__button regulator__button--minus"
        onClick={e => value > minValue && handleDown(e)}
      >
        &minus;
      </div>
      <div className="regulator__indicator">{children}</div>
      <div className="regulator__button" onClick={handleUp}>
        +
      </div>
    </div>
  );
};

interface Props {
  minValue?: number;
  value: number;
  handleUp: TSymbolClickHandle;
  handleDown: TSymbolClickHandle;
  children: JSX.Element;
}

export type TRegulatorHandle = (asset: PlatformAssetFull) => TSymbolClickHandle;

type TSymbolClickHandle = (event: React.SyntheticEvent<HTMLElement>) => void;

export default Regulator;
