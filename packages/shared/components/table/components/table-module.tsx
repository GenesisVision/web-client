import React from "react";
import { updateFilter } from "shared/components/table//helpers/filtering.helpers";
import { calculateTotalPages } from "shared/components/table//helpers/paging.helpers";

import { composeRequestFilters } from "../services/table.service";
import Table from "./table";
import { IDataModel, IPaging } from "shared/constants/constants";

const defaultData: IDataModel = { items: null, total: 0 };

interface ITableModuleState {
  paging: IPaging;
  sorting: Object;
  filtering: Object;
  data: IDataModel;
  isPending: boolean;
}

export interface ITableModuleProps {
  loader: boolean;
  paging: IPaging;
  sorting: string;
  filtering: Object;
  defaultFilters: any[];
  getItems: Function;
  data: IDataModel;
}

class TableModule extends React.Component<
  ITableModuleProps,
  ITableModuleState
> {
  static defaultProps = {
    loader: true
  };
  constructor(props: ITableModuleProps) {
    super(props);

    const { paging, sorting, filtering } = this.props;

    this.state = {
      paging: paging,
      sorting: sorting,
      filtering: filtering,
      data: defaultData,
      isPending: false
    };
  }

  componentDidMount() {
    const { data, paging } = this.props;
    if (data) {
      const totalPages = calculateTotalPages(data.total, paging.itemsOnPage);
      this.setState({
        data,
        paging: { ...paging, totalPages }
      });
    } else {
      this.updateItems();
    }
  }

  updateItems = () => {
    const { paging, sorting, filtering } = this.state;
    const { defaultFilters, getItems, loader } = this.props;

    if (loader) this.setState({ isPending: true });

    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });
    getItems(filters)
      .then((data: any) => {
        const totalPages = calculateTotalPages(data.total, paging.itemsOnPage);
        this.setState(prevState => ({
          data,
          paging: { ...prevState.paging, totalPages },
          isPending: false
        }));
      })
      .catch((e: any) => {
        this.setState({ isPending: false });
      });
  };

  handleUpdateSorting = (sorting: Object) => {
    this.setState(
      prevState => ({
        sorting: sorting,
        paging: {
          ...prevState.paging,
          currentPage: 1
        }
      }),
      this.updateItems
    );
  };

  handleUpdateFilter = (filter: Object) => {
    this.setState(prevState => {
      return {
        filtering: updateFilter(prevState.filtering, filter),
        paging: {
          ...prevState.paging,
          currentPage: 1
        }
      };
    }, this.updateItems);
  };

  handleUpdatePaging = (nextPageIndex: number) => {
    this.setState(
      prevState => ({
        paging: {
          ...prevState.paging,
          currentPage: nextPageIndex + 1
        }
      }),
      this.updateItems
    );
  };

  handleUpdateRow = (row: any) => {
    const { data } = this.state;
    const newData = {
      ...data,
      items: data.items.map((x: any) => (x.id === row.id ? row : x))
    };
    this.setState({ data: newData });
  };

  render() {
    const { data, isPending, paging } = this.state;
    const newPaging = { ...paging, totalItems: data.total ? data.total : 0 };
    return (
      <Table
        {...this.props}
        {...this.state}
        paging={newPaging}
        items={data.items}
        isPending={isPending}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
        updateRow={this.handleUpdateRow}
      />
    );
  }
}

export default TableModule;
