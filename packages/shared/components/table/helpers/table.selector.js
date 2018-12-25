import { createSelector } from "reselect";

const defaultData = {
  items: [],
  total: 0
};

export const tableSelectorCreator = (selector, itemName) =>
  createSelector(selector, table => {
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
