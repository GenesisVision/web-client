import { createSelector } from "reselect";

import { ITableState } from "../reducers/table.reducer";
import { IDataModel, SpecificTypePropsNames, mapToTableItems } from "./mapper";

const defaultData: IDataModel<any> = {
  items: [],
  total: 0
};

export const tableSelectorCreator = <
  State,
  ItemsModel extends { total: number },
  ItemsType
>(
  selector: ((state: State) => ITableState<ItemsModel>),
  itemName: SpecificTypePropsNames<ItemsModel, ItemsType[]>
) =>
  createSelector(selector, (table: ITableState<ItemsModel>) => {
    const data = table.itemsData.data
      ? mapToTableItems<ItemsModel, ItemsType>(itemName)(table.itemsData.data)
      : defaultData;
    return {
      ...table,
      itemsData: { ...table.itemsData, data }
    };
  });
