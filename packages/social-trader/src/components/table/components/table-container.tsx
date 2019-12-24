import { updateFilter } from "components/table/helpers/filtering.helpers";
import * as React from "react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";

import { getItems, updateFilters } from "../services/table.service";
import { FilteringType, TFilter } from "./filtering/filter.type";
import Table, { ITableProps } from "./table";
import { GetItemsFuncActionType, TableSelectorType } from "./table.types";

const _TableContainer: React.FC<ITableContainerProps> = props => {
  const { isFetchOnMount, dataSelector } = props;
  const tableSelectorData = useSelector(tableDataSelector(props));
  const {
    data,
    isPending,
    paging,
    filtering,
    fetchItems,
    defaults
  } = tableSelectorData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetchOnMount) updateItems();
  }, [isFetchOnMount]);

  const updateItems = useCallback(
    (changedFilters?: FilteringType) => {
      dispatch(updateFilters(defaults.type, changedFilters));
      dispatch(getItems(fetchItems, dataSelector));
    },
    [defaults.type, dataSelector]
  );

  const handleUpdateSorting = useCallback(
    (sorting: string) => {
      updateItems({
        sorting,
        paging: {
          ...paging,
          currentPage: 1
        }
      });
    },
    [paging]
  );

  const handleUpdateFilter = useCallback(
    (filter: TFilter<string>) => {
      const changedFilters = {
        filtering: updateFilter(filtering, filter),
        paging: {
          ...paging,
          currentPage: 1
        }
      };
      updateItems(changedFilters);
    },
    [filtering, paging]
  );

  const handleUpdatePaging = useCallback(
    (nextPageIndex: number) => {
      const changedFilters = {
        paging: {
          ...paging,
          currentPage: nextPageIndex + 1
        }
      };
      updateItems(changedFilters);
    },
    [paging]
  );

  const newPaging = useMemo(
    () => ({ ...paging, totalItems: data ? data.total : 0 }),
    [data, paging]
  );
  return (
    <>
      <Table
        {...props}
        {...tableSelectorData}
        updateItems={updateItems}
        updateRow={updateItems}
        paging={newPaging}
        items={data.items}
        isPending={isPending}
        updateSorting={handleUpdateSorting}
        updatePaging={handleUpdatePaging}
        updateFilter={handleUpdateFilter}
      />
    </>
  );
};

const tableDataSelector = ({
  dataSelector,
  getItems
}: ITableContainerProps) => (state: RootState) => {
  const {
    itemsData,
    filters: { sorting, paging, filtering },
    defaults
  } = dataSelector(state);
  return {
    data: itemsData.data,
    isPending: itemsData.isPending,
    sorting,
    paging,
    filtering,
    fetchItems: getItems,
    defaults
  };
};

interface ITableContainerProps extends ITableProps {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  isFetchOnMount: boolean;
}

const TableContainer = React.memo(_TableContainer);
export default TableContainer;
