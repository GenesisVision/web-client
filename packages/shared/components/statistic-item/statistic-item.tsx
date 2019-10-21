import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import { BlurContainer } from "shared/components/blur-container/blur-container";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";

const _StatisticItem: React.FC<Props> = ({
  isPending,
  invert,
  large,
  big,
  small,
  label,
  children,
  accent,
  half,
  className,
  labelClassName,
  equivalent,
  equivalentCurrency
}) => {
  const generateClasses = (item: ITEM) => {
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
          className={classNames(
            "statistics-item__top",
            labelClassName,
            generateClasses(ITEM.LABEL)
          )}
        >
          {label}
        </div>
      )}
      <div className={generateClasses(ITEM.VALUE)}>
        <BlurContainer blur={!!isPending}>{children}</BlurContainer>
      </div>
      {equivalent !== undefined && equivalentCurrency !== undefined ? (
        <div className="statistics-item__equivalent">
          <NumberFormat
            value={formatCurrencyValue(equivalent, equivalentCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${equivalentCurrency}`}
          />
        </div>
      ) : null}
    </div>
  );
};

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

interface Props {
  isPending?: boolean;
  label?: string | React.ReactNode;
  equivalent?: number;
  equivalentCurrency?: string;
  small?: boolean;
  big?: boolean;
  large?: boolean;
  accent?: boolean;
  half?: boolean;
  invert?: boolean;
  className?: string;
  labelClassName?: string;
}

const StatisticItem = React.memo(withLoader(_StatisticItem));
export default StatisticItem;
