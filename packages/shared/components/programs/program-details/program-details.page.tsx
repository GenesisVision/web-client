import "shared/components/details/details.scss";

import { ProgramDetailsFull } from "gv-api-web";
import React, { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { redirectToLogin } from "shared/components/auth/signin/signin.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import {
  dispatchPlatformLevelsParameters,
  dispatchProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection } from "./program-details.types";
import { programDescriptionSelector } from "./reducers/description.reducer";

const _ProgramDetailsPage: React.FC<Props> = ({
  description,
  service: {
    dispatchProgramDescription,
    dispatchPlatformLevelsParameters,
    redirectToLogin
  },
  descriptionSection,
  currency,
  isKycConfirmed
}) => {
  useEffect(() => {
    dispatchProgramDescription();
  }, []);
  useEffect(
    () => {
      description && dispatchPlatformLevelsParameters(description.currency);
    },
    [description]
  );
  return (
    <ProgramDetailsContainer
      condition={!!description}
      loader={<DetailsContainerLoader />}
      redirectToLogin={redirectToLogin}
      descriptionSection={descriptionSection}
      description={description!}
      currency={currency}
      isKycConfirmed={isKycConfirmed}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  description: programDescriptionSelector(state),
  currency: currencySelector(state),
  isKycConfirmed: kycConfirmedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription,
      redirectToLogin,
      dispatchPlatformLevelsParameters
    },
    dispatch
  )
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
}

interface StateProps {
  description?: ProgramDetailsFull;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
  redirectToLogin: typeof redirectToLogin;
  dispatchPlatformLevelsParameters: typeof dispatchPlatformLevelsParameters;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const ProgramDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramDetailsPage);
export default ProgramDetailsPage;
