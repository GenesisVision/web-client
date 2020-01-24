import "./statistic-item.scss";

import {
  IStatisticItemContainerBlockProps,
  StatisticItemContainerBlock
} from "components/statistic-item/statistic-item-container.block";
import StatisticItemInner, {
  IStatisticItemInnerProps
} from "components/statistic-item/statistic-item-inner";
import withLoader from "decorators/with-loader";
import * as React from "react";

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
  return (
    <StatisticItemContainerBlock
      withPadding={withPadding}
      half={half}
      small={small}
      className={className}
    >
      <StatisticItemInner
        noWrap={noWrap}
        hideLabel={hideLabel}
        isPending={isPending}
        label={label}
        equivalent={equivalent}
        equivalentCurrency={equivalentCurrency}
        small={small}
        big={big}
        large={large}
        accent={accent}
        invert={invert}
        labelClassName={labelClassName}
      >
        {children}
      </StatisticItemInner>
    </StatisticItemContainerBlock>
  );
};

interface Props
  extends IStatisticItemInnerProps,
    IStatisticItemContainerBlockProps {}

const StatisticItem = withLoader(_StatisticItem);
export default StatisticItem;
