import React from "react";
import { ISelectChangeEvent } from "shared/components/select/select";
import TileFilterButton from "shared/components/table/components/filtering/tile-filter-button";
import CurrencySelect from "shared/modules/currency-select/components/currency-select";
import { CurrencyEnum } from "shared/utils/types";

import { TAddChartCurrency } from "./chart-currency-selector";

const _AddCurrencyButton: React.FC<Props> = ({ onAdd, currencies }) => {
  const onChange = ({ target: { value } }: ISelectChangeEvent) =>
    onAdd(value as CurrencyEnum);
  return (
    <TileFilterButton
      title={
        <CurrencySelect
          value={"ADD"}
          onChange={onChange}
          currencyValues={currencies}
        />
      }
    />
  );
};

interface Props {
  onAdd: TAddChartCurrency;
  currencies: CurrencyEnum[];
}

const AddCurrencyButton = React.memo(_AddCurrencyButton);
export default AddCurrencyButton;
