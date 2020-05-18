import { ISelectChangeEvent } from "components/select/select";
import TileFilterButton from "components/table/components/filtering/tile-filter-button";
import styles from "modules/chart-currency-selector/chart-currency-selector.module.scss";
import CurrencySelect from "modules/currency-select/components/currency-select";
import React from "react";
import { CurrencyEnum } from "utils/types";

import { TAddChartCurrency } from "./chart-currency-selector.types";

const _AddCurrencyButton: React.FC<Props> = ({ onAdd, currencies }) => {
  const onChange = ({ target: { value } }: ISelectChangeEvent) =>
    onAdd(value as CurrencyEnum);
  return (
    <TileFilterButton
      title={
        <CurrencySelect
          bottomLine={false}
          size={"small"}
          className={styles["chart-currency-selector__select"]}
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
