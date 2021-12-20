import {
  calculateTotalPages,
  IPaging
} from "components/table//helpers/paging.helpers";
import { updateFilter } from "components/table/helpers/filtering.helpers";
import { IDataModel } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { composeRequestFilters } from "../services/table.service";
import {
  FilteringType,
  TDefaultFilters,
  TFilter
} from "./filtering/filter.type";
import Table, { ITableProps } from "./table";
import { GetItemsFuncType, UpdateItemsFunc } from "./table.types";

const defaultData: IDataModel = { items: null, total: 0 };

export interface ITableModuleProps extends ITableProps {
  updates?: any[];
  updateItemsFunc?: UpdateItemsFunc;
  name?: string;
  cache?: boolean;
  getItems: GetItemsFuncType;
  defaultFilters?: TDefaultFilters;
  loader?: boolean;
  data?: IDataModel;
  timestamp?: number;
}

const _TableModule: React.FC<ITableModuleProps> = props => {
  const {
    updates,
    updateItemsFunc,
    name,
    cache,
    paging: pagingProp,
    sorting: sortingProp,
    filtering: filteringProp,
    loader = true,
    data: dataProp,
    defaultFilters,
    getItems,
    timestamp
  } = props;
  const [items, setItems] = useState<any[] | undefined>(undefined);
  const [paging, setPaging] = useState<IPaging | undefined>(pagingProp);
  const [sorting, setSorting] = useState<string | undefined>(sortingProp);
  const [filtering, setFiltering] = useState<FilteringType | undefined>(
    filteringProp
  );
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();

  const updateItems = useCallback(() => {
    if (loader) setIsPending();
    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });
    return getItems(filters).finally(setIsNotPending);
  }, [loader, paging, sorting, filtering, timestamp]);

  const { data = defaultData, setData, sendRequest } = useApiRequest({
    cache,
    name,
    request: updateItems
  });

  useEffect(() => {
    sendRequest();
  }, [paging, sorting, filtering, timestamp]);

  useEffect(() => {
    if (dataProp && pagingProp) {
      const totalPages = calculateTotalPages(
        data.total,
        pagingProp.itemsOnPage
      );
      setData(dataProp);
      setPaging({ ...pagingProp, totalPages });
    }
  }, []);

  useEffect(() => {
    if (updateItemsFunc && updates && items && items.length) {
      setItems(updateItemsFunc(items, updates));
    } else if (data.items) {
      setItems(data.items);
    }
  }, [updates, updateItemsFunc, data.items]);

  const handleUpdateSorting = useCallback(
    (sorting: string) => {
      setSorting(sorting);
      setPaging({ ...paging, currentPage: 1 });
    },
    [paging]
  );

  const handleUpdateFilter = useCallback(
    (filter: TFilter) => {
      if (!filtering || !paging) return;
      setFiltering(updateFilter(filtering, filter));
      setPaging({
        ...paging,
        currentPage: 1
      });
    },
    [filtering, paging]
  );

  const handleUpdatePaging = useCallback(
    (nextPageIndex: number) => {
      setPaging({
        ...paging,
        currentPage: nextPageIndex + 1
      });
    },
    [paging]
  );

  const handleUpdateRow = useCallback(
    (row: any) => {
      const newData = {
        ...data,
        items: data.items.map((x: any) => (x.id === row.id ? row : x))
      };
      setData(newData);
    },
    [data]
  );

  const newPaging = useMemo(
    () => ({
      ...paging,
      totalItems: data.total ? data.total : 0,
      totalPages: calculateTotalPages(data.total, paging && paging.itemsOnPage)
    }),
    [
      paging?.itemsOnPage,
      paging?.currentPage,
      paging?.totalItems,
      paging?.totalPages,
      data.total
    ]
  );

  return (
    <Table
      {...props}
      sorting={sorting}
      filtering={filtering}
      paging={newPaging}
      items={items}
      isPending={isPending}
      updateSorting={handleUpdateSorting}
      updatePaging={handleUpdatePaging}
      updateFilter={handleUpdateFilter}
      updateRow={handleUpdateRow}
      updateItems={updateItems}
    />
  );
};

const TableModule = React.memo(_TableModule);
export default TableModule;
