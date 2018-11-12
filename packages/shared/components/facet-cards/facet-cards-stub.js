import Surface from "shared/components/surface/surface";
import React from "react";

const facetsStub = [1, 2, 3, 4];
const FacetCardsStub = () => {
  return (
    <div className="facets-shadow">
      <div className="facets">
        {facetsStub.map(x => (
          <Surface key={x} className="facet facet--stub" />
        ))}
      </div>
    </div>
  );
};

export default FacetCardsStub;
