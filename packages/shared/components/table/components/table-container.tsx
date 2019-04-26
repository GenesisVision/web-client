import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Selector } from "reselect";
import { updateFilter } from "shared/components/table/helpers/filtering.helpers";
import RootState from "shared/reducers/root-reducer";

import { IDataModel } from "../helpers/mapper";
import { IPaging } from "../helpers/paging.helpers";
import { ITableState } from "../reducers/table.reducer";
import { getItems, updateFilters } from "../services/table.service";
import { IFilter, IFiltering } from "./filtering/filter.type";
import Table, { ITableRenderProps } from "./table";
import { ITableBodyExternalProps } from "./table-body";
import { ITableHeaderBaseProps } from "./table-header";
import { ITableToolbarBaseProps } from "./table-toolbar";
import { GetItemsFuncActionType, GetItemsFuncType } from "./table.types";

class _TableContainer<TFiltering, TItem> extends React.PureComponent<
  Props<TFiltering, TItem>,
  StateProps<TItem>
> {
  static defaultProps = {
    isPending: false
  };
  componentDidMount() {
    const { isFetchOnMount } = this.props;
    if (isFetchOnMount) this.updateItems();
  }

  updateItems = (changedFilters?: Object) => {
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

  handleUpdateFilter = <T extends any>(filter: IFilter<T>) => {
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

const mapStateToProps = <TFiltering, TItem>(
  state: RootState,
  props: OwnProps<TFiltering, TItem>
): StateProps<TItem> => {
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

const mapDispatchToProps = <TItem extends any>(
  dispatch: Dispatch
): DispatchProps<TItem> => ({
  service: bindActionCreators({ getItems, updateFilters }, dispatch)
});

const TableContainer = /*connect<
  StateProps<any>,
  DispatchProps<any>,
  OwnProps<any, any>,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)*/ _TableContainer;

export default TableContainer;

interface OwnProps<TFiltering, TItem>
  extends ITableHeaderBaseProps,
    ITableToolbarBaseProps<TFiltering>,
    ITableBodyExternalProps<TItem>,
    ITableRenderProps<TItem> {
  getItems: GetItemsFuncActionType;
  dataSelector: Selector<any, ITableState<IDataModel<TItem>>>;
  isFetchOnMount: boolean;
}

interface Props<TFiltering, TItem>
  extends StateProps<TItem>,
    DispatchProps<TItem>,
    OwnProps<TFiltering, TItem> {
  //getItems2: GetItemsFuncType<TFiltering, TItem>;
}

interface StateProps<TItem> {
  data: IDataModel<TItem>;
  isPending: boolean;
  sorting: string;
  paging: IPaging;
  filtering: IFiltering<any>;
  fetchItems: GetItemsFuncActionType;
  defaults: any;
}

interface DispatchProps<TItem> {
  service: {
    getItems(
      fetchItems: GetItemsFuncActionType,
      dataSelector: Selector<any, ITableState<IDataModel<TItem>>>
    ): (dispatch: Dispatch, getState: any) => void;
    updateFilters(
      filters?: Object,
      type?: string
    ): (dispatch: Dispatch) => void;
  };
}
