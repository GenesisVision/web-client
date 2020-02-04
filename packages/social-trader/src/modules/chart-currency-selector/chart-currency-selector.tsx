import "./chart-currency-selector.scss";

import { ISelectChangeEvent } from "components/select/select";
import TileFilterItem from "components/table/components/filtering/tile-filter-item";
import TagBubble from "components/tags/tag-item/tag-bubble";
import TagCircle from "components/tags/tag-item/tag-circle";
import CurrencySelect from "modules/currency-select/components/currency-select";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import AddCurrencyButton from "./add-currency-button";

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
        <AddCurrencyButton onAdd={onAdd} currencies={selectCurrencies} />
      )}
    </div>
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
