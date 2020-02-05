import { createSelector } from "reselect";

import { ITableState } from "../reducers/table.reducer";
import { DefaultTableState, mapToTableItems } from "./mapper";

const defaultDataConst = {
  items: [],
  total: 0
};

export const tableSelectorCreator = <
  State,
  TableState extends DefaultTableState,
  ItemsType
>(
  selector: (state: State) => ITableState<TableState>,
  itemName: string = "items",
  defaultData: {
    items: any;
    total: number;
  } = defaultDataConst
) =>
  createSelector(selector, (table: ITableState<TableState>) => {
    const data = table.itemsData.data
      ? mapToTableItems<ItemsType>(itemName)(table.itemsData.data)
      : defaultData;
    return {
      ...table,
      itemsData: { ...table.itemsData, data }
    };
  });
