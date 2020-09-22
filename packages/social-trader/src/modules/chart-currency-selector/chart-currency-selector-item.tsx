import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import TileFilterItem from "components/table/components/filtering/tile-filter-item";
import TagBubble from "components/tags/tag-item/tag-bubble";
import TagCircle from "components/tags/tag-item/tag-circle";
import {
  TChangeChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector.types";
import CurrencySelect from "modules/currency-select/components/currency-select";
import * as React from "react";
import styled from "styled-components";
import { CurrencyEnum } from "utils/types";

interface Props {
  i: number;
  name: string;
  color: string;
  fullSelectCurrencies?: CurrencyEnum[];
  selectCurrencies: CurrencyEnum[];
  onRemove: TRemoveChartCurrency;
  onChange: TChangeChartCurrency;
}

const StyledCurrencySelect = styled(CurrencySelect)`
  min-width: auto;
  height: auto;
  display: block;
  border-bottom: 0;
`;

const _ChartCurrencySelectorItem: React.FC<Props> = ({
  i,
  name,
  color,
  fullSelectCurrencies,
  selectCurrencies,
  onRemove,
  onChange
}) => {
  return (
    <TileFilterItem removable={i > 0} id={name} removeTile={onRemove}>
      <TagBubble color={color}>
        <Center>
          <RowItem size={"small"}>
            <TagCircle backgroundColor={color} />
          </RowItem>
          <RowItem>
            {selectCurrencies.length || i === 0 ? (
              <StyledCurrencySelect
                bottomLine={false}
                size={"small"}
                value={name}
                onChange={onChange(i)}
                currencyValues={
                  i === 0 && fullSelectCurrencies
                    ? fullSelectCurrencies.filter(
                        fullSelectCurrency => fullSelectCurrency !== name
                      )
                    : selectCurrencies
                }
              />
            ) : (
              name
            )}
          </RowItem>
        </Center>
      </TagBubble>
    </TileFilterItem>
  );
};

export const ChartCurrencySelectorItem = React.memo(_ChartCurrencySelectorItem);
