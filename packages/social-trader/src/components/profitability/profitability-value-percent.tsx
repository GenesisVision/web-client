import { Center } from "components/center/center";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { formatCurrencyValue, roundPercents } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const Container = styled(Center)`
  margin-top: -4px;
`;

const _ProfitabilityValuePercent: React.FC<Props> = ({
  value,
  currency,
  percent
}) => {
  return (
    <Container>
      <RowItem size={"small"}>
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
    </Container>
  );
};

interface Props {
  value: number;
  currency: CurrencyEnum;
  percent: number;
}

export const ProfitabilityValuePercent = React.memo(_ProfitabilityValuePercent);
