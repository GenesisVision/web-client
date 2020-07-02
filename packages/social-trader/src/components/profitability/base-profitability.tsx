import clsx from "clsx";
import * as React from "react";

import { PROFITABILITY_VARIANT } from "./profitability.helper";
import styles from "./profitability.module.scss";

const _BaseProfitability: React.FC<Props> = ({
  className,
  variant,
  isPositive,
  isNegative,
  children
}) => (
  <div
    className={clsx(styles["profitability"], className, {
      [styles["profitability--positive"]]: isPositive,
      [styles["profitability--negative"]]: isNegative,
      [styles["profitability--chips"]]: variant === PROFITABILITY_VARIANT.CHIPS
    })}
  >
    {children}
  </div>
);

const BaseProfitability = React.memo(_BaseProfitability);

export default BaseProfitability;

interface Props {
  className?: string;
  children: JSX.Element | string;
  isPositive: boolean;
  isNegative: boolean;
  variant?: PROFITABILITY_VARIANT;
}
