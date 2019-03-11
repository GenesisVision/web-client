import { ParametricSelector, createSelector } from "reselect";

const defaultData = {
  items: [],
  total: 0
};

export type table = {
  itemsData: { data: any };
};

/*
Temp to declare selectors types

export const tableSelectorCreator = <S, P, T>(
  selector: ParametricSelector<S, P, table>[],
  itemName: string
) =>*/
export const tableSelectorCreator = (selector: any, itemName: string) =>
  createSelector(selector, (table: any) => {
    const data = table.itemsData.data
      ? {
          total: table.itemsData.data.total,
          items: table.itemsData.data[itemName]
        }
      : defaultData;
    return {
      ...table,
      itemsData: { ...table.itemsData, data }
    };
  });
