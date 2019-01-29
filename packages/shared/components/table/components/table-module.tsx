import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { updateFilter } from "shared/components/table//helpers/filtering.helpers";
import { calculateTotalPages } from "shared/components/table//helpers/paging.helpers";

import { composeRequestFilters } from "../services/table.service";
import Table from "./table";
import { SORTING } from "shared/constants/constants";

const defaultData = { items: null, total: 0 };

class TableModule extends PureComponent {
  constructor(props) {
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
    const { defaultFilters, getItems } = this.props;

    this.setState({ isPending: true });

    const filters = composeRequestFilters({
      paging,
      sorting,
      filtering,
      defaultFilters
    });
    getItems(filters)
      .then(data => {
        const totalPages = calculateTotalPages(data.total, paging.itemsOnPage);
        this.setState(prevState => ({
          data,
          paging: { ...prevState.paging, totalPages },
          isPending: false
        }));
      })
      .catch(e => {
        this.setState({ isPending: false });
      });
  };

  handleUpdateSorting = sorting => {
    this.setState(
      prevState => ({
        sorting: sorting,
        paging: {
          ...prevState.paging,
          currentPage: 1
        }
      }),
      () => {
        if (this.props.selfSorting) {
          const direction = ~sorting.indexOf(SORTING.ASC)
            ? SORTING.ASC
            : SORTING.DESC;
          const column = sorting.slice(0, -direction.length);
          this.setState({
            data: {
              ...this.state.data,
              items: this.state.data.items.sort((a, b) => {
                if (a[column] > b[column])
                  return direction === SORTING.ASC ? 1 : -1;
                else if (a[column] < b[column])
                  return direction === SORTING.ASC ? -1 : 1;
                else return 0;
              })
            }
          });
        } else this.updateItems();
      }
    );
  };

  handleUpdateFilter = filter => {
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

  handleUpdatePaging = nextPageIndex => {
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

  handleUpdateRow = row => {
    const { data } = this.state;
    const newData = {
      ...data,
      items: data.items.map(x => (x.id === row.id ? row : x))
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

TableModule.propTypes = {
  paging: PropTypes.object,
  sorting: PropTypes.string,
  filtering: PropTypes.object,
  defaultFilters: PropTypes.array,
  getItems: PropTypes.func,
  data: PropTypes.object
};

export default TableModule;
