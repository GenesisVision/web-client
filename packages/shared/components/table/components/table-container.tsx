import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateFilter } from "shared/components/table/helpers/filtering.helpers";

import { getItems, updateFilters } from "../services/table.service";
import Table from "./table";
import RootState from "shared/reducers/root-reducer";
import { IPaging } from "../helpers/paging.helpers";
import { SortingColumn } from "./filtering/filter.type";

interface ITableContainerProps {
  getItems(): void;
  dataSelector: any;
  isFetchOnMount: boolean;
  renderHeader?(column: SortingColumn): JSX.Element;
  renderSorting?(value: SortingColumn): string;
  renderBodyCard?(
    x: any,
    updateRow?: (row: any) => void,
    updateItems?: () => void
  ): JSX.Element;
  renderBodyRow?(
    x: any,
    updateRow?: (row: any) => void,
    updateItems?: () => void
  ): JSX.Element;
  renderFilters?(
    updateFilter: (filter: any) => void,
    filtering: Object
  ): JSX.Element;
  columns?: SortingColumn[];
  createButtonToolbar?: JSX.Element;
}

interface ITableContainerStateProps {
  data: { items: any[]; total: number };
  isPending: boolean;
  sorting: string;
  paging: IPaging;
  filtering: Object;
  fetchItems(): void;
  defaults: any;
}

interface ITableContainerDispatchProps {
  service: {
    getItems(
      fetchItems: any,
      dataSelector: (opts?: any) => { [keys: string]: any }
    ): (dispatch: Dispatch, getState: any) => void;
    updateFilters(
      filters?: Object,
      type?: string
    ): (dispatch: Dispatch) => void;
  };
}

class TableContainer extends React.Component<
  ITableContainerProps &
    ITableContainerStateProps &
    ITableContainerDispatchProps
> {
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

  handleUpdateFilter = (filter: string) => {
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
  props: ITableContainerProps & ITableContainerDispatchProps
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
): ITableContainerDispatchProps => {
  return { service: bindActionCreators({ getItems, updateFilters }, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
