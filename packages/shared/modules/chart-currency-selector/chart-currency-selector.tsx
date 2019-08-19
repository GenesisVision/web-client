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

const MAX_CHARTS = 2;

const _ChartCurrencySelector: React.FC<Props> = ({
  currencyValues,
  chartCurrencies,
  onAdd,
  onRemove,
  onChange
}) => {
  return (
    <div className="chart-currency-selector__container">
      {chartCurrencies.map(({ asset, color, mandatory, id }, i) => (
        <TileFilterItem
          key={asset}
          id={id}
          mandatory={mandatory}
          removeTile={onRemove}
        >
          <TagBubble
            color={color}
            content={
              <div className="chart-currency-selector__item">
                <TagCircle backgroundColor={color} />
                {mandatory ? (
                  asset
                ) : (
                  <CurrencySelect
                    value={asset}
                    onChange={onChange(i)}
                    currencyValues={currencyValues.filter(
                      currencyValue =>
                        !!!chartCurrencies.find(
                          ({ asset }) => asset === currencyValue
                        )!
                    )}
                  />
                )}
              </div>
            }
          />
        </TileFilterItem>
      ))}
      {chartCurrencies.length < MAX_CHARTS && (
        <TileFilterButton onClick={onAdd} title={"Add"} />
      )}
    </div>
  );
};

export type TChartCurrency = {
  id: string;
  asset: CurrencyEnum;
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
