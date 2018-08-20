import Surface from "components/surface/surface";
import React from "react";

const facetsStub = [1, 2, 3, 4];
const FacetCardsStub = () => {
  return (
    <div className="facets">
      {facetsStub.map(x => (
        <Surface className="facet facet--stub" />
      ))}
    </div>
  );
};

export default FacetCardsStub;
