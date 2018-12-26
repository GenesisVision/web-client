import React from "react";
import Surface from "shared/components/surface/surface";

const facetsStub = [1, 2, 3, 4];
const FacetCardsStub = () => {
  return (
    <div className="facets__wrapper facets__shadow facets__shadow--right">
      <div className="facets__carousel">
        <div className="facets">
          {facetsStub.map(x => (
            <Surface
              key={x}
              className="surface--without-paddings facet facet--stub"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacetCardsStub;
