import * as React from "react";
import {
  calculateTotalPages,
  IPaging
} from "shared/components/table//helpers/paging.helpers";
import { updateFilter } from "shared/components/table/helpers/filtering.helpers";
import { IDataModel } from "shared/constants/constants";

import { composeRequestFilters } from "../services/table.service";
import { FilteringType, TFilter } from "./filtering/filter.type";
import Table, { ITableProps } from "./table";
import { GetItemsFuncType } from "./table.types";

const defaultData: IDataModel = { items: null, total: 0 };

export interface ITableModuleProps extends ITableProps {
  defaultFilters: any[];
  getItems: GetItemsFuncType;
  loader?: boolean;
  data?: IDataModel;
}

interface ITableModuleState {
  paging?: IPaging;
  sorting?: string;
  filtering?: FilteringType;
  data: IDataModel;
  isPending: boolean;
}

class TableModule extends React.PureComponent<
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
    if (data && paging) {
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
    const { paging = {}, sorting = "", filtering = {} } = this.state;
    const { defaultFilters, getItems, loader } = this.props;

    if (loader) this.setState({ isPending: true });

    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });
    getItems(filters)
      .then((data: IDataModel) => {
        const totalPages = calculateTotalPages(
          data.total,
          paging && paging.itemsOnPage
        );
        this.setState(prevState => ({
          data,
          paging: { ...prevState.paging, totalPages },
          isPending: false
        }));
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
  };

  handleUpdateSorting = (sorting: string) => {
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

  handleUpdateFilter = (filter: TFilter<any>) => {
    this.setState(prevState => {
      if (!prevState.filtering || !prevState.paging) return {};
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
        updateItems={this.updateItems}
      />
    );
  }
}

export default TableModule;
