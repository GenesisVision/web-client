import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";

import { HORIZONTAL_POPOVER_POS } from "../popover/popover";
import Tooltip from "../tooltip/tooltip";

const _StatisticItem: React.FC<Props> = ({
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
  equivalentCurrency,
  labelTooltip
}) => {
  const generateClasses = (item: ITEM, invert: boolean, tooltip?: boolean) => {
    switch (
      (item === ITEM.VALUE && !invert) || (item === ITEM.LABEL && invert)
    ) {
      case true:
        return classNames("statistics-item__value", {
          "statistics-item__label--tooltip": tooltip,
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        });
      case false:
      default:
        return classNames("statistics-item__label", {
          "statistics-item__label--tooltip": tooltip
        });
    }
  };

  const renderLabel = () => (
    <div
      className={
        "statistics-item__top " +
        generateClasses(ITEM.LABEL, invert, Boolean(labelTooltip))
      }
    >
      {label}
    </div>
  );

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
      {label ? (
        labelTooltip && label ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <div className="tooltip__content">{labelTooltip}</div>
            )}
          >
            {renderLabel()}
          </Tooltip>
        ) : (
          renderLabel()
        )
      ) : null}
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

const StatisticItem = withLoader(React.memo(_StatisticItem));
export default StatisticItem;

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

interface Props {
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
  labelTooltip?: string;
}
