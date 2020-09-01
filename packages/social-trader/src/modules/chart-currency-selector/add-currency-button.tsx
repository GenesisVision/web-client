import { ISelectChangeEvent } from "components/select/select";
import TileFilterButton from "components/table/components/filtering/tile-filter-button";
import CurrencySelect from "modules/currency-select/components/currency-select";
import React from "react";
import styled from "styled-components";
import { CurrencyEnum } from "utils/types";

import { TAddChartCurrency } from "./chart-currency-selector.types";

const StyledCurrencySelect = styled(CurrencySelect)`
  min-width: auto;
  height: auto;
  display: block;
  border-bottom: 0;
`;

const _AddCurrencyButton: React.FC<Props> = ({ onAdd, currencies }) => {
  const onChange = ({ target: { value } }: ISelectChangeEvent) =>
    onAdd(value as CurrencyEnum);
  return (
    <TileFilterButton
      title={
        <StyledCurrencySelect
          bottomLine={false}
          size={"small"}
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
