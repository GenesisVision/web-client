import "./statistic-item.scss";

import classNames from "classnames";
import { BlurContainer } from "components/blur-container/blur-container";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import withLoader from "decorators/with-loader";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

const _StatisticItem: React.FC<Props> = ({
  noWrap = true,
  withPadding,
  hideLabel,
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
        return classNames("statistics-item__label", {
          "statistics-item__label--no-wrap": noWrap
        });
    }
  };

  return (
    <StatisticItemContainerBlock
      withPadding={withPadding}
      half={half}
      small={small}
      className={className}
    >
      <div
        className={classNames(
          { "statistics-item__top--hidden": hideLabel },
          "statistics-item__top",
          labelClassName,
          generateClasses(ITEM.LABEL)
        )}
      >
        {label}
      </div>
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
    </StatisticItemContainerBlock>
  );
};

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

interface Props {
  noWrap?: boolean;
  withPadding?: boolean;
  hideLabel?: boolean;
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

const StatisticItem = withLoader(_StatisticItem);
export default StatisticItem;
