import "./statistic-item.scss";

import classNames from "classnames";
import { BlurContainer } from "components/blur-container/blur-container";
import withLoader from "decorators/with-loader";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";

const getTextContent = (node: React.ReactNode) => {
  // @ts-ignore
  return node?.props?.labelText;
};

const getTestId = (label: string | React.ReactNode) =>
  typeof label === "string" ? label : getTextContent(label);

const _StatisticItemInner: React.FC<IStatisticItemInnerProps> = ({
  noWrap = true,
  hideLabel,
  isPending,
  invert,
  large,
  big,
  small,
  label,
  children,
  accent,
  labelClassName,
  equivalent,
  equivalentCurrency
}) => {
  const testId = getTestId(label);
  const generateClasses = (item: ITEM) =>
    (item === ITEM.VALUE && !invert) || (item === ITEM.LABEL && invert)
      ? classNames("statistics-item__value", {
          "statistics-item__value--accent": accent,
          "statistics-item__value--small": small,
          "statistics-item__value--big": big,
          "statistics-item__value--large": large
        })
      : classNames("statistics-item__label", {
          "statistics-item__label--small": small,
          "statistics-item__label--no-wrap": noWrap
        });

  return (
    <div>
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
      <div className={generateClasses(ITEM.VALUE)} data-test-id={testId}>
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

export interface IStatisticItemInnerProps {
  noWrap?: boolean;
  hideLabel?: boolean;
  isPending?: boolean;
  label?: string | React.ReactNode;
  equivalent?: number;
  equivalentCurrency?: string;
  small?: boolean;
  big?: boolean;
  large?: boolean;
  accent?: boolean;
  invert?: boolean;
  labelClassName?: string;
}

const StatisticItemInner = withLoader(_StatisticItemInner);
export default StatisticItemInner;
