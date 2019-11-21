import Surface from "components/surface/surface";
import * as React from "react";

const facetsStub: number[] = [1, 2, 3, 4];
const FacetCardsStub: React.FC = () => (
  <div className="facets__wrapper facets__shadow facets__shadow--right">
    <div className="facets__carousel">
      <div className="facets">
        {facetsStub.map((x: number) => (
          <Surface
            key={x}
            className="surface--without-paddings facet facet--stub"
          />
        ))}
      </div>
    </div>
  </div>
);

export default FacetCardsStub;
