import { connect } from "react-redux";
import React from "react";

import FilterPane from "./filter-pane/filter-pane";

const FilterContainer = ({ isOpen, children }) => {
  return <FilterPane isOpen={isOpen}>{children}</FilterPane>;
};

const mapStateToProps = state => {
  const { isOpen } = state.filterData;
  return { isOpen };
};

export default connect(mapStateToProps)(FilterContainer);
