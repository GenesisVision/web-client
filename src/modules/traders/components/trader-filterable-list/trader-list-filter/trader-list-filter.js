import { Link } from "react-router-dom";
import React from "react";

import InputRange from "../../../../../shared/components/form/input-range/input-range";

const TraderListFilter = () => {
  return (
    <div>
      <div>
        <h4>Min Level</h4>
        <div>
          <Link to={{ pathname: "/traders", search: `?levelMin=1` }}>
            level 1
          </Link>
          <Link to={{ pathname: "/traders", search: `?levelMin=2` }}>
            level 2
          </Link>
        </div>
      </div>
      <div>
        <h4>Avg profit</h4>
        <div>
          <InputRange />
        </div>
      </div>
      <div>
        <h4>Available investments</h4>
        <div>
          <InputRange />
        </div>
      </div>
      <button>Apply</button>
      <button>Reset</button>
    </div>
  );
};

export default TraderListFilter;
