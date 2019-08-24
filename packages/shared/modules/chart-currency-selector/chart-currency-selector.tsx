import "./chart-currency-selector.scss";

import * as React from "react";
import { ISelectChangeEvent } from "shared/components/select/select";
import TileFilterButton from "shared/components/table/components/filtering/tile-filter-button";
import TileFilterItem from "shared/components/table/components/filtering/tile-filter-item";
import TagBubble from "shared/components/tags/tag-item/tag-bubble";
import TagCircle from "shared/components/tags/tag-item/tag-circle";
import CurrencySelect from "shared/modules/currency-select/components/currency-select";
import { CurrencyEnum } from "shared/utils/types";

const _ChartCurrencySelector: React.FC<Props> = ({
  fullSelectCurrencies,
  maxCharts = 2,
  selectCurrencies,
  chartCurrencies,
  onAdd,
  onRemove,
  onChange
}) => (
  <div className="chart-currency-selector__container">
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
            <div className="chart-currency-selector__item">
              <TagCircle backgroundColor={color} />
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
            </div>
          }
        />
      </TileFilterItem>
    ))}
    {chartCurrencies.length < maxCharts && (
      <TileFilterButton onClick={onAdd} title={"Add"} />
    )}
  </div>
);

export type TChartCurrency = {
  name: CurrencyEnum;
  color: string;
  mandatory?: boolean;
};

export type TAddChartCurrency = () => void;
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
