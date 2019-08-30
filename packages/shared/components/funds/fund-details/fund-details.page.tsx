import "shared/components/details/details.scss";

import * as React from "react";
import { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { redirectToLogin } from "shared/components/auth/signin/signin.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsContainer from "./fund-details.container";
import { IDescriptionSection } from "./fund-details.types";
import {
  FundDescriptionDataType,
  fundDescriptionSelector
} from "./reducers/description.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsPage: React.FC<Props> = ({
  isKycConfirmed,
  description,
  eventTypeFilterValues,
  currency,
  service: { dispatchFundDescription, redirectToLogin },
  isAuthenticated,
  descriptionSection
}) => {
  useEffect(
    () => {
      dispatchFundDescription();
    },
    [dispatchFundDescription]
  );
  return (
    <FundDetailsContainer
      isKycConfirmed={isKycConfirmed}
      condition={!!description}
      loader={<DetailsContainerLoader assets />}
      redirectToLogin={redirectToLogin}
      eventTypeFilterValues={eventTypeFilterValues}
      descriptionSection={descriptionSection}
      description={description!}
      currency={currency}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isKycConfirmed: kycConfirmedSelector(state),
  description: fundDescriptionSelector(state),
  currency: currencySelector(state),
  isAuthenticated: isAuthenticatedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      dispatchFundDescription,
      redirectToLogin
    },
    dispatch
  )
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
  eventTypeFilterValues: SelectFilterValue[];
}

interface StateProps {
  description?: FundDescriptionDataType;
  isKycConfirmed: boolean;
  isAuthenticated: boolean;
  currency: CurrencyEnum;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
  redirectToLogin: typeof redirectToLogin;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const FundDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_FundDetailsPage);
export default FundDetailsPage;
