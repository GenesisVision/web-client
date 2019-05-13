import { FundFacet, ProgramFacet } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { IFundsFacetTableProps } from "shared/components/funds/funds-facet/components/funds-facet-table";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import { IProgramsFacetTableProps } from "shared/components/programs/programs-facet/components/programs-facet-table";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { IDataModel } from "shared/constants/constants";
import { withAuthenticated } from "shared/decorators/is-authenticated";
import RootState from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

class _FacetContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: undefined,
    notFound: undefined,
    facet: undefined
  };

  componentDidMount() {
    const { service, facets } = this.props;
    if (facets !== null) {
      this.setState({ ...service.getCurrentFacet() });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { service, facets } = this.props;
    if (prevProps.facets !== facets) {
      this.setState({ ...service.getCurrentFacet() });
    }
  }

  getFacetItems: GetItemsFuncType = filtering => {
    const { getItems } = this.props;
    const { id } = this.state.facet!;
    return getItems({ ...filtering, facetId: id });
  };

  render() {
    const { TableContainer, isAuthenticated } = this.props;
    const { isPending, notFound, facet } = this.state;
    if (!facet || isPending) return null;
    if (notFound) return <NotFoundPage />;
    const { title, sorting, timeframe } = facet!;
    return (
      <TableContainer
        title={title}
        sorting={sorting}
        timeframe={timeframe}
        getItems={this.getFacetItems}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

const mapStateToProps = (state: RootState, props: Props): StateProps => {
  const { data } = state.platformData;
  let facets = null;
  if (data && props.asset)
    facets = (data as { [keys: string]: any })[props.asset];
  return { facets };
};

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
  props: Props
): DispatchProps => {
  const { getCurrentFacet } = props;
  return {
    service: {
      getCurrentFacet: () => dispatch(getCurrentFacet())
    }
  };
};

interface OwnProps {
  getCurrentFacet: () => (
    dispatch: MiddlewareDispatch,
    getState: any
  ) => FacetDataType;
  asset: FACET_ASSET;
  TableContainer: React.ComponentType<
    IProgramsFacetTableProps | IFundsFacetTableProps
  >;
  getItems: (args: FilteringType) => Promise<IDataModel>;
  isAuthenticated?: boolean;
}
interface StateProps {
  facets: FacetType[];
}
interface DispatchProps {
  service: {
    getCurrentFacet: () => FacetDataType;
  };
}
interface Props extends OwnProps, StateProps, DispatchProps {}
interface State extends FacetDataType {}
export type FacetType = ProgramFacet | FundFacet;
export type FacetDataType = {
  isPending?: boolean;
  notFound?: boolean;
  facet?: FacetType;
};
export enum FACET_ASSET {
  PROGRAMS = "programsFacets",
  FUNDS = "fundsFacets"
}

const FacetContainer = compose<React.ComponentType<OwnProps>>(
  withRouter,
  withAuthenticated,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_FacetContainer);
export default FacetContainer;
