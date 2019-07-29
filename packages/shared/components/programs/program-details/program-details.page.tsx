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
  dispatchProgramDescription,
  getBalanceChart,
  getProfitChart
} from "shared/components/programs/program-details/services/program-details.service";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { programDescriptionSelector } from "../reducers/description.reducer";
import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection, IHistorySection } from "./program-details.types";

const _ProgramDetailsPage: React.FC<Props> = ({
  description,
  service: {
    dispatchProgramDescription,
    dispatchPlatformLevelsParameters,
    redirectToLogin
  },
  descriptionSection,
  historySection,
  currency,
  isAuthenticated,
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
      historySection={historySection}
      descriptionSection={descriptionSection}
      description={description!}
      currency={currency}
      isAuthenticated={isAuthenticated}
      isKycConfirmed={isKycConfirmed}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  description: programDescriptionSelector(state),
  currency: currencySelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
  isKycConfirmed: kycConfirmedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription,
      redirectToLogin,
      getProfitChart,
      getBalanceChart,
      dispatchPlatformLevelsParameters
    },
    dispatch
  )
});

interface OwnProps {
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
}

interface StateProps {
  description?: ProgramDetailsFull;
  isAuthenticated: boolean;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
  redirectToLogin: typeof redirectToLogin;
  getProfitChart: typeof getProfitChart;
  getBalanceChart: typeof getBalanceChart;
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
