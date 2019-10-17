import {
  FundFacet,
  PlatformCurrency,
  PlatformInfo,
  ProgramFacet
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createSelector } from "reselect";
import { IFundsFacetTableProps } from "shared/components/funds/funds-facet/components/funds-facet-table";
import NotFoundPage from "shared/components/not-found/not-found";
import { IProgramsFacetTableProps } from "shared/components/programs/programs-facet/components/programs-facet-table";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { withAuthenticated } from "shared/decorators/is-authenticated";
import useIsOpen from "shared/hooks/is-open.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import {
  platformCurrenciesSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  TGetState
} from "shared/utils/types";

const _FacetContainer: React.FC<Props> = ({
  TableContainer,
  isAuthenticated,
  service,
  facets,
  getItems,
  currency,
  currencies
}) => {
  const [
    isPending,
    setIsPending,
    setIsNotPending,
    setPendingValue
  ] = useIsOpen();
  const [notFound, setNotFound, setFound, setFoundValue] = useIsOpen();
  const [facet, setFacet] = useState<FacetType | undefined>(undefined);
  useEffect(() => {
    if (facets !== null) {
      const { facet, isPending, notFound } = service.getCurrentFacet();
      setFacet(facet);
      setPendingValue(!!isPending);
      setFoundValue(!!notFound);
    }
  }, [facets, service, setFoundValue, setPendingValue]);
  const getFacetItems = useCallback(
    filtering => getItems({ ...filtering, facetId: facet!.id }),
    [facet, getItems]
  );
  if (!facet || isPending) return null;
  if (notFound) return <NotFoundPage />;
  const { title, sorting, timeframe } = facet!;
  return (
    <TableContainer
      title={title}
      sorting={sorting}
      timeframe={timeframe}
      getItems={getFacetItems}
      isAuthenticated={isAuthenticated}
      currency={currency}
      currencies={currencies}
    />
  );
};

const facetSelector = createSelector<
  RootState,
  OwnProps,
  PlatformInfo | undefined,
  FACET_ASSET,
  FacetType[] | undefined
>(
  state => platformDataSelector(state),
  (state, props) => props.asset,
  (data, asset) => {
    if (!data) return undefined;
    return data[asset];
  }
);

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  facets: facetSelector(state, props),
  currencies: platformCurrenciesSelector(state),
  currency: currencySelector(state)
});

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
  { getCurrentFacet }: Props
): DispatchProps => ({
  service: {
    getCurrentFacet: () => dispatch(getCurrentFacet())
  }
});

interface OwnProps {
  getCurrentFacet: () => (
    dispatch: MiddlewareDispatch,
    getState: TGetState
  ) => FacetDataType;
  asset: FACET_ASSET;
  TableContainer: React.ComponentType<
    IProgramsFacetTableProps | IFundsFacetTableProps
  >;
  getItems: (args: FilteringType) => Promise<IDataModel>;
  isAuthenticated?: boolean;
}
interface StateProps {
  facets?: FacetType[];
  currencies: PlatformCurrency[];
  currency: CurrencyEnum;
}
interface DispatchProps {
  service: {
    getCurrentFacet: () => FacetDataType;
  };
}
interface Props extends OwnProps, StateProps, DispatchProps {}
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
  ),
  React.memo
)(_FacetContainer);
export default FacetContainer;
