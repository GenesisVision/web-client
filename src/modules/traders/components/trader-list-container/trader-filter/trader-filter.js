import React from "react";

import InputRange from "../../../../../shared/components/form/input-range/input-range";

const TraderFilter = () => {
  return (
    <div>
      <div>
        <h4>Level</h4>
        <div>
          <InputRange />
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

export default TraderFilter;
