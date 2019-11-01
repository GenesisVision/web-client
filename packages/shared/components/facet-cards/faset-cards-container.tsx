import { PlatformInfo } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "shared/reducers/root-reducer";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

export enum ASSETS_FACETS {
  FOLLOWS = "followsFacets",
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

export const _FacetCardsContainer: React.FC<Props> = ({
  title,
  composeFacetUrl,
  assetsFacets,
  info,
  fileRoute
}) => {
  if (!info) return <FacetCardsStub />;
  return (
    <FacetCards
      title={title}
      facets={info[assetsFacets]}
      composeFacetUrl={composeFacetUrl}
      fileRoute={fileRoute}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const info = state.platformData.data;
  return {
    info
  };
};

const FacetCardsContainer = connect(mapStateToProps)(_FacetCardsContainer);
export default FacetCardsContainer;

interface OwnProps {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
  fileRoute: string;
}

interface StateProps {
  info?: PlatformInfo;
}

interface Props extends OwnProps, StateProps {}
