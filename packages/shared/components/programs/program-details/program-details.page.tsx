import "shared/components/details/details.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/signin/signin.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import NotFoundPage from "shared/components/not-found/not-found";
import {
  getPlatformLevelsParameters,
  getProgramDescription,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import { ProgramStatisticResult } from "shared/components/programs/program-details/services/program-details.types";
import useErrorMessage from "shared/hooks/error-message.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection, IHistorySection } from "./program-details.types";

const _ProgramDetailsPage: React.FC<Props> = ({
  service,
  descriptionSection,
  historySection,
  currency,
  isAuthenticated,
  isKycConfirmed
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [levelsParameters, setLevelsParameters] = useState<
    LevelsParamsInfo | undefined
  >(undefined);
  const [description, setDescription] = useState<
    ProgramDetailsFull | undefined
  >(undefined);
  const [statistic, setStatistic] = useState<
    ProgramStatisticResult | undefined
  >(undefined);
  const updateDetails = useCallback(() => service.getProgramDescription(), []);
  useEffect(() => {
    const update = updateDetails();
    update.then(setDescription).catch(setErrorMessage);
    update
      .then(data => data.id)
      .then(getProgramStatistic)
      .then(setStatistic)
      .catch(setErrorMessage);
    update
      .then(data => data.currency)
      .then(getPlatformLevelsParameters)
      .then(setLevelsParameters)
      .catch(setErrorMessage);
  }, []);
  if (errorMessage) return <NotFoundPage />;
  return (
    <ProgramDetailsContainer
      condition={!!description && !!levelsParameters}
      loader={<DetailsContainerLoader />}
      updateDetails={updateDetails}
      redirectToLogin={service.redirectToLogin}
      historySection={historySection}
      descriptionSection={descriptionSection}
      description={description!}
      statistic={statistic}
      currency={currency}
      isAuthenticated={isAuthenticated}
      levelsParameters={levelsParameters!}
      isKycConfirmed={isKycConfirmed}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  currency: currencySelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
  isKycConfirmed: kycConfirmedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    { getProgramDescription, redirectToLogin },
    dispatch
  )
});

interface OwnProps {
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
}

interface StateProps {
  isAuthenticated: boolean;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
}

interface DispatchProps {
  service: {
    getProgramDescription(): Promise<ProgramDetailsFull>;
    redirectToLogin(): void;
  };
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
