import "shared/components/details/details.scss";

import {
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
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
import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "shared/components/programs/program-details/services/program-details.types";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, ResponseError } from "shared/utils/types";

import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection, IHistorySection } from "./program-details.types";

class _ProgramDetailsPage extends React.PureComponent<Props, State> {
  state = {
    hasError: false,
    isPending: false,
    levelsParameters: undefined,
    description: undefined,
    profitChart: undefined,
    balanceChart: undefined,
    statistic: undefined
  };

  componentDidMount() {
    const update = this.updateDetails();
    update
      .then(data => getProgramStatistic(data.id))
      .then(data => {
        this.setState({ isPending: false, ...data });
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
    update
      .then(data => getPlatformLevelsParameters(data.currency))
      .then(levelsParameters => this.setState({ levelsParameters }));
  }

  updateDetails = () => {
    const { service } = this.props;
    this.setState({ isPending: true });
    return service
      .getProgramDescription()
      .then(description => {
        this.setState({ isPending: false, description });
        return description;
      })
      .catch((e: ResponseError) => {
        this.setState({ hasError: true });
        throw e;
      });
  };

  render() {
    const {
      service,
      descriptionSection,
      historySection,
      currency,
      isAuthenticated,
      isKycConfirmed
    } = this.props;
    const {
      levelsParameters,
      hasError,
      description,
      statistic,
      profitChart,
      balanceChart
    } = this.state;
    if (hasError) return <NotFoundPage />;
    return (
      <ProgramDetailsContainer
        condition={!!description && !!levelsParameters}
        loader={<DetailsContainerLoader />}
        updateDetails={this.updateDetails}
        redirectToLogin={service.redirectToLogin}
        historySection={historySection}
        descriptionSection={descriptionSection}
        description={description!}
        profitChart={profitChart}
        balanceChart={balanceChart}
        statistic={statistic}
        currency={currency}
        isAuthenticated={isAuthenticated}
        levelsParameters={levelsParameters!}
        isKycConfirmed={isKycConfirmed}
      />
    );
  }
}

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

interface State {
  isPending: boolean;
  hasError: boolean;
  description?: ProgramDetailsFull;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
  statistic?: ProgramDetailsStatistic;
  levelsParameters?: LevelsParamsInfo;
}

const ProgramDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramDetailsPage);
export default ProgramDetailsPage;
