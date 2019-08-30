import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { updateFilter } from "shared/components/table/helpers/filtering.helpers";
import { IDataModel } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";

import { IPaging } from "../helpers/paging.helpers";
import { getItems, updateFilters } from "../services/table.service";
import { FilteringType, TDefaults, TFilter } from "./filtering/filter.type";
import Table, { ITableProps } from "./table";
import { GetItemsFuncActionType, TableSelectorType } from "./table.types";

interface ITableContainerProps extends ITableProps {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  isFetchOnMount: boolean;
}

interface ITableContainerStateProps {
  data: IDataModel;
  isPending: boolean;
  sorting: string;
  paging: IPaging;
  filtering: FilteringType;
  fetchItems: GetItemsFuncActionType;
  defaults: TDefaults;
}

interface ITableContainerDispatchProps {
  service: {
    getItems(
      fetchItems: GetItemsFuncActionType,
      dataSelector: (opts?: any) => { [keys: string]: any }
    ): (dispatch: Dispatch, getState: any) => void;
    updateFilters(
      filters?: FilteringType,
      type?: string
    ): (dispatch: Dispatch) => void;
  };
}

class _TableContainer extends React.PureComponent<
  ITableContainerProps &
    ITableContainerDispatchProps &
    ITableContainerStateProps
> {
  componentDidMount() {
    const { isFetchOnMount } = this.props;
    if (isFetchOnMount) this.updateItems();
  }

  updateItems = (changedFilters?: FilteringType) => {
    const { service, dataSelector, fetchItems, defaults } = this.props;
    service.updateFilters(changedFilters, defaults.type);
    service.getItems(fetchItems, dataSelector);
  };

  handleUpdateSorting = (sorting: string) => (): void => {
    this.updateItems({
      sorting,
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    });
  };

  handleUpdateFilter = (filter: TFilter<string>) => {
    let changedFilters = {
      filtering: updateFilter(this.props.filtering, filter),
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    };
    this.updateItems(changedFilters);
  };

  handleUpdatePaging = (nextPageIndex: number) => {
    let changedFilters = {
      paging: {
        ...this.props.paging,
        currentPage: nextPageIndex + 1
      }
    };
    this.updateItems(changedFilters);
  };

  render() {
    const { data, isPending, paging, ...otherProps } = this.props;
    const newPaging = { ...paging, totalItems: data ? data.total : 0 };
    return (
      <Table
        {...otherProps}
        updateRow={this.updateItems}
        paging={newPaging}
        items={data.items}
        isPending={isPending}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState,
  props: ITableContainerProps
): ITableContainerStateProps => {
  const selector = props.dataSelector(state);
  const { itemsData, filters, defaults } = selector;
  const { sorting, paging, filtering } = filters;
  return {
    data: itemsData.data,
    isPending: itemsData.isPending,
    sorting,
    paging,
    filtering,
    fetchItems: props.getItems,
    defaults
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ITableContainerDispatchProps => ({
  service: bindActionCreators({ getItems, updateFilters }, dispatch)
});

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TableContainer);
export default TableContainer;
