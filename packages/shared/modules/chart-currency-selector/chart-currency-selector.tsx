import "./chart-currency-selector.scss";

import * as React from "react";
import { useState } from "react";
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

const _ChartCurrencySelector: React.FC<Props> = ({ currencyValues }) => {
  const [items, setItems] = useState<any[]>([
    { name: "GVT", color: "#00BDAF", mandatory: true }
  ]);
  const addCurrency = () => {
    setItems([...items, { name: "BTC", color: "#56DEF1" }]);
  };
  const removeCurrency = (id: string) => {
    setItems([...items.filter(item => item.name !== id)]);
  };
  const changeCurrency = (event: ISelectChangeEvent, child: JSX.Element) => {};
  return (
    <div className="chart-currency-selector__container">
      {items.map(({ name, color, mandatory }) => (
        <TileFilterItem
          key={name}
          id={name}
          mandatory={mandatory}
          removeTile={removeCurrency}
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
                    value={"BTC"}
                    currencyValues={currencyValues}
                    onChange={changeCurrency}
                  />
                )}
              </div>
            }
          />
        </TileFilterItem>
      ))}
      {items.length < MAX_CHARTS && (
        <TileFilterButton onClick={addCurrency} title={"Add"} />
      )}
    </div>
  );
};

interface StateProps {
  currencyValues: CurrencyEnum[];
}
interface OwnProps {}

interface Props extends OwnProps, StateProps {}

const mapStateToProps = (state: RootState): StateProps => ({
  currencyValues: currenciesSelector(state) as CurrencyEnum[]
});

const ChartCurrencySelector = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, null, OwnProps, RootState>(mapStateToProps),
  React.memo
)(_ChartCurrencySelector);
export default ChartCurrencySelector;
