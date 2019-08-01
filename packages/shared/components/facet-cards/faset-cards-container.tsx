import * as React from "react";
import { useContext } from "react";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

export const _FacetCardsContainer: React.FC<OwnProps> = ({
  title,
  composeFacetUrl,
  assetsFacets
}) => {
  let info: any = null;
  if (!info) return <FacetCardsStub />;
  return (
    <FacetCards
      title={title}
      facets={info[assetsFacets]}
      composeFacetUrl={composeFacetUrl}
    />
  );
};

interface OwnProps {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
}

export enum ASSETS_FACETS {
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

export default _FacetCardsContainer;
