import { connect } from "react-redux";
import React from "react";

import Filter from "./filter/filter";

const FilterContainer = ({ isOpen, children }) => {
  return <Filter isOpen={isOpen}>{children}</Filter>;
};

const mapStateToProps = state => {
  const { isOpen } = state.filterData;
  return { isOpen };
};

export default connect(mapStateToProps)(FilterContainer);
