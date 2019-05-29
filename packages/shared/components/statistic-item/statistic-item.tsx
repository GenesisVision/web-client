import "./statistic-item.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";
import Tooltip from "../tooltip/tooltip";
import { HORIZONTAL_POPOVER_POS } from "../popover/popover";

const _StatisticItem: React.FC<IFollowStatisticItemProps> = ({
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
  tooltipContent
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
        return classNames("statistics-item__label", {
          "statistics-item__label--tooltip": tooltipContent
        });
    }
  };

  const renderLabel = () => (
    <div
      className={"statistics-item__top " + generateClasses(ITEM.LABEL, invert)}
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
        tooltipContent && label ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <div className="statistics-item__tooltip">{tooltipContent}</div>
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
  tooltipContent?: string;
}
