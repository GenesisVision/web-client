import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { ISelectChangeEvent } from "components/select/select";
import TileFilterItem from "components/table/components/filtering/tile-filter-item";
import TagBubble from "components/tags/tag-item/tag-bubble";
import TagCircle from "components/tags/tag-item/tag-circle";
import CurrencySelect from "modules/currency-select/components/currency-select";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import AddCurrencyButton from "./add-currency-button";
import "./chart-currency-selector.scss";

const _ChartCurrencySelector: React.FC<Props> = ({
  fullSelectCurrencies,
  maxCharts = 2,
  selectCurrencies,
  chartCurrencies,
  onAdd,
  onRemove,
  onChange
}) => {
  return (
    <Center className="chart-currency-selector__container">
      {chartCurrencies.map(({ name, color }, i) => (
        <TileFilterItem
          removable={i > 0}
          key={name}
          id={name}
          removeTile={onRemove}
        >
          <TagBubble
            color={color}
            content={
              <Center className="chart-currency-selector__item">
                <RowItem small>
                  <TagCircle backgroundColor={color} />
                </RowItem>
                <RowItem>
                  {selectCurrencies.length || i === 0 ? (
                    <CurrencySelect
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
            }
          />
        </TileFilterItem>
      ))}
      {chartCurrencies.length < maxCharts && (
        <AddCurrencyButton onAdd={onAdd} currencies={selectCurrencies} />
      )}
    </Center>
  );
};

export type TChartCurrency = {
  name: CurrencyEnum;
  color: string;
};

export type TAddChartCurrency = (currency: CurrencyEnum) => void;
export type TRemoveChartCurrency = (id: string) => void;
export type TChangeChartCurrency = (
  i: number
) => (event: ISelectChangeEvent, child: JSX.Element) => void;

interface OwnProps {
  fullSelectCurrencies?: CurrencyEnum[];
  selectCurrencies: CurrencyEnum[];
  maxCharts?: number;
  chartCurrencies: TChartCurrency[];
  onAdd: TAddChartCurrency;
  onRemove: TRemoveChartCurrency;
  onChange: TChangeChartCurrency;
}

interface Props extends OwnProps {}

const ChartCurrencySelector = React.memo(_ChartCurrencySelector);
export default ChartCurrencySelector;
