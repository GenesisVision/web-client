import "./chart-currency-selector.scss";

import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ISelectChangeEvent } from "shared/components/select/select";
import TileFilterButton from "shared/components/table/components/filtering/tile-filter-button";
import TileFilterItem from "shared/components/table/components/filtering/tile-filter-item";
import TagBubble from "shared/components/tags/tag-item/tag-bubble";
import TagCircle from "shared/components/tags/tag-item/tag-circle";
import CurrencySelect from "shared/modules/currency-select/components/currency-select";
import { currenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

const _ChartCurrencySelector: React.FC<Props> = ({
  maxCharts = 2,
  selectCurrencies,
  currencyValues,
  chartCurrencies,
  onAdd,
  onRemove,
  onChange
}) => {
  return (
    <div className="chart-currency-selector__container">
      {chartCurrencies.map(({ name, color, mandatory }, i) => (
        <TileFilterItem
          removable={i > 0}
          key={name}
          id={name}
          mandatory={mandatory}
          removeTile={onRemove}
        >
          <TagBubble
            color={color}
            content={
              <div className="chart-currency-selector__item">
                <TagCircle backgroundColor={color} />
                {mandatory ? (
                  name
                ) : (
                  <CurrencySelect
                    value={name}
                    onChange={onChange(i)}
                    currencyValues={selectCurrencies.map(({ name }) => name)}
                  />
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
};

export type TChartCurrency = {
  name: CurrencyEnum;
  color: string;
  mandatory?: boolean;
};

interface StateProps {
  currencyValues: CurrencyEnum[];
}

export type TAddChartCurrency = () => void;
export type TRemoveChartCurrency = (id: string) => void;
export type TChangeChartCurrency = (
  i: number
) => (event: ISelectChangeEvent, child: JSX.Element) => void;

interface OwnProps {
  maxCharts?: number;
  selectCurrencies: TChartCurrency[];
  chartCurrencies: TChartCurrency[];
  onAdd: TAddChartCurrency;
  onRemove: TRemoveChartCurrency;
  onChange: TChangeChartCurrency;
}

interface Props extends OwnProps, StateProps {}

const mapStateToProps = (state: RootState): StateProps => ({
  currencyValues: currenciesSelector(state) as CurrencyEnum[]
});

const ChartCurrencySelector = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, null, OwnProps, RootState>(mapStateToProps),
  React.memo
)(_ChartCurrencySelector);
export default ChartCurrencySelector;
