import { Center } from "components/center/center";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, roundPercents } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProfitabilityValuePercent: React.FC<Props> = ({
  value,
  currency,
  percent
}) => {
  return (
    <Center className="profitability-value-percent">
      <RowItem small>
        <Profitability
          value={formatCurrencyValue(value, currency)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatCurrencyValue(value, currency)}
            suffix={` ${currency}`}
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </RowItem>
      <Profitability value={`${percent}`} variant={PROFITABILITY_VARIANT.CHIPS}>
        {roundPercents(percent)}
      </Profitability>
    </Center>
  );
};

interface Props {
  value: number;
  currency: CurrencyEnum;
  percent: number;
}

export const ProfitabilityValuePercent = React.memo(_ProfitabilityValuePercent);
