import { connect } from "react-redux";
import React, { Component } from "react";

import {
  composeFilter,
  filterCompare
} from "../../../shared/services/filter-service";
import Filter from "./filter/filter";
import filterActions from "../actions/filter-actions";
import withQueryParams from "../../../shared/hoc/with-query-params/with-query-params";

class FilterContainer extends Component {
  state = {
    isNewFilter: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const prevFilter = composeFilter(
      this.props.queryParams,
      this.props.defaultFilterValues
    );
    const nextFilter = composeFilter(
      nextProps.queryParams,
      this.props.defaultFilterValues
    );
    const isNewFilter = !filterCompare(prevFilter, nextFilter);
    if (this.state.isNewFilter !== isNewFilter) {
      this.setState({
        isNewFilter: isNewFilter
      });
    }

    return (
      nextProps.isOpen !== this.props.isOpen ||
      nextState.isNewFilter !== this.state.isNewFilter
    );
  }

  /* componentWillUpdate(nextProps) {
    const prevFilter = composeFilter(
      this.props.queryParams,
      this.props.defaultFilterValues
    );
    const nextFilter = composeFilter(
      nextProps.queryParams,
      this.props.defaultFilterValues
    );

    const isNewFilter = !filterCompare(prevFilter, nextFilter);
    if (this.state.isNewFilter !== isNewFilter) {
      this.setState({
        isNewFilter: isNewFilter
      });
    }
  }*/

  render() {
    const {
      isOpen,
      component: Component,
      filterComponent: FilterComponent
    } = this.props;
    return (
      <div>
        <Filter isOpen={isOpen}>
          <FilterComponent />
        </Filter>
        <Component
          isNewFilter={this.state.isNewFilter}
          queryParams={this.props.queryParams}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isOpen } = state.filterData;
  return { isOpen };
};

export default withQueryParams(connect(mapStateToProps, null)(FilterContainer));
