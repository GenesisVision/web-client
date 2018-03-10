import { Link } from "react-router-dom";
import React from "react";

import FilterItem from "../../../../../shared/components/filters/filter-item/filter-item";
import InputRange from "../../../../../shared/components/form/input-range/input-range";

import "./trader-list-filter.css";

const TraderListFilter = () => {
  return (
    <div className="trader-list-filter">
      <FilterItem
        title="Level"
        description="Select Trader Level"
        component={() => (
          <div>
            <Link to={{ pathname: "/traders", search: `?levelMin=1` }}>
              level 1
            </Link>
            <Link to={{ pathname: "/traders", search: `?levelMin=2` }}>
              level 2
            </Link>
          </div>
        )}
      />
      <FilterItem
        title="Average Profit"
        description="Select Average Profit"
        component={() => (
          <div>
            <Link to={{ pathname: "/traders", search: `?levelMin=1` }}>
              level 1
            </Link>
          </div>
        )}
      />
    </div>
  );
};

export default TraderListFilter;
