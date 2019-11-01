import { FundFacet, PlatformInfoOld, ProgramFacet } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { platformDataSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

export const _FacetCardsContainer: React.FC<Props> = ({
  facets,
  title,
  composeFacetUrl
}) => (
  <FacetCards
    condition={!!facets.length}
    loader={<FacetCardsStub />}
    title={title}
    facets={facets}
    composeFacetUrl={composeFacetUrl}
  />
);

const facetsSelector = createSelector<
  RootState,
  OwnProps,
  PlatformInfoOld | undefined,
  ASSETS_FACETS,
  Array<ProgramFacet & FundFacet>
>(
  (state: RootState) => platformDataSelector(state),
  (state: RootState, props: OwnProps) => props.assetsFacets,
  (data: PlatformInfoOld | undefined, assetsFacets: ASSETS_FACETS) =>
    (data ? data[assetsFacets] : []) as Array<ProgramFacet & FundFacet>
);

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  facets: facetsSelector(state, props)
});

interface StateProps {
  facets: Array<ProgramFacet & FundFacet>;
}

interface Props extends OwnProps, StateProps {}

interface OwnProps {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
}

export enum ASSETS_FACETS {
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

const FacetCardsContainer = connect<StateProps, null, OwnProps, RootState>(
  mapStateToProps
)(_FacetCardsContainer);
export default FacetCardsContainer;
