import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/signin/signin.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import {
  getFundDescription,
  getFundStatistic
} from "shared/components/funds/fund-details/services/fund-details.service";
import NotFoundPage from "shared/components/not-found/not-found";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import useErrorMessage from "shared/hooks/error-message.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsContainer from "./fund-details.container";
import { IDescriptionSection } from "./fund-details.types";
import { FundStatisticResult } from "./services/fund-details.types";

const _FundDetailsPage: React.FC<Props> = ({
  historySection,
  currency,
  service,
  isAuthenticated,
  descriptionSection
}) => {
  const [statistic, setStatistic] = useState<FundStatisticResult | undefined>(
    undefined
  );
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [description, setDescription] = useState<FundDetailsFull | undefined>(
    undefined
  );
  const getDescription = service.getFundDescription;
  const updateDescription = useCallback(
    () =>
      getDescription()
        .then(setDescription)
        .catch(setErrorMessage),
    []
  );
  useEffect(() => {
    const description = getDescription();
    updateDescription();
    description
      .then(data => data.id)
      .then(getFundStatistic)
      .then(setStatistic)
      .catch(setErrorMessage);
  }, []);
  if (errorMessage) return <NotFoundPage />;
  return (
    <FundDetailsContainer
      condition={!!description}
      loader={<DetailsContainerLoader assets />}
      updateDescription={updateDescription}
      redirectToLogin={service.redirectToLogin}
      historySection={historySection}
      descriptionSection={descriptionSection}
      description={description!}
      statistic={statistic}
      currency={currency}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  currency: currencySelector(state),
  isAuthenticated: isAuthenticatedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators({ getFundDescription, redirectToLogin }, dispatch)
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
  historySection: IHistorySection;
}

interface StateProps {
  isAuthenticated: boolean;
  currency: CurrencyEnum;
}

interface DispatchProps {
  service: {
    getFundDescription(): Promise<FundDetailsFull>;
    redirectToLogin(): void;
  };
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
