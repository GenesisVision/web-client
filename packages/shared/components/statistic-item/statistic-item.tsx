import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "shared/utils/formatter";

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

export interface IFollowStatisticItemProps {
  label: string | React.ReactNode;
  equivalent?: string | number;
  equivalentCurrency?: string;
  small?: boolean;
  big?: boolean;
  large?: boolean;
  accent?: boolean;
  half?: boolean;
  invert?: boolean;
  className?: string;
}
const StatisticItem: React.FC<IFollowStatisticItemProps> = ({
  invert = false,
  large,
  big,
  small,
  label,
  children,
  accent,
  half,
  className,
  equivalent,
  equivalentCurrency
}) => {
  const generateClasses = (item: ITEM, invert: boolean) => {
    switch (
      (item === ITEM.VALUE && !invert) || (item === ITEM.LABEL && invert)
    ) {
      case true:
        return classNames("statistics-item__value", {
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        });
      case false:
      default:
        return "statistics-item__label";
    }
  };

  return (
    <div
      className={classNames(
        "statistics-item",
        {
          "statistics-item--half": half,
          "statistics-item--small": small
        },
        className
      )}
    >
      {label && (
        <div
          className={
            "statistics-item__top " + generateClasses(ITEM.LABEL, invert)
          }
        >
          {label}
        </div>
      )}
      <div className={generateClasses(ITEM.VALUE, invert)}>{children}</div>
      {equivalent !== undefined && equivalentCurrency !== undefined ? (
        <div className="statistics-item__equivalent">
          {
            <NumberFormat
              value={formatCurrencyValue(+equivalent, equivalentCurrency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${equivalentCurrency}`}
            />
          }
        </div>
      ) : null}
    </div>
  );
};

export default StatisticItem;
