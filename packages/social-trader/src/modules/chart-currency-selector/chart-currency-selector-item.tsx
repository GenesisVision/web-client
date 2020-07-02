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
import { CurrencyEnum } from "utils/types";

import styles from "./chart-currency-selector.module.scss";

interface Props {
  i: number;
  name: string;
  color: string;
  fullSelectCurrencies?: CurrencyEnum[];
  selectCurrencies: CurrencyEnum[];
  onRemove: TRemoveChartCurrency;
  onChange: TChangeChartCurrency;
}

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
    <TileFilterItem
      bottomOffset={false}
      removable={i > 0}
      id={name}
      removeTile={onRemove}
    >
      <TagBubble
        color={color}
        content={
          <Center>
            <RowItem size={"small"}>
              <TagCircle backgroundColor={color} />
            </RowItem>
            <RowItem>
              {selectCurrencies.length || i === 0 ? (
                <CurrencySelect
                  bottomLine={false}
                  size={"small"}
                  className={styles["chart-currency-selector__select"]}
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
  );
};

export const ChartCurrencySelectorItem = React.memo(_ChartCurrencySelectorItem);
