import { createSelector } from "reselect";

import { ITableState } from "../reducers/table.reducer";
import { mapToTableItems } from "./mapper";

const defaultData = {
  items: [],
  total: 0
};

export const tableSelectorCreator = <State, TableState, ItemsType>(
  selector: ((state: State) => ITableState<TableState>),
  itemName: string
) =>
  createSelector(selector, (table: ITableState<TableState>) => {
    const data = table.itemsData.data
      ? //@ts-ignore
        mapToTableItems<ItemsType>(itemName)(table.itemsData.data)
      : defaultData;
    return {
      ...table,
      itemsData: { ...table.itemsData, data }
    };
  });
