import "shared/components/details/details.scss";

import { ProgramBalanceChart, ProgramDetailsFull } from "gv-api-web";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/login/login.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import {
  getProgramDescription,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "shared/components/programs/program-details/services/program-details.types";
import RootState from "shared/reducers/root-reducer";
import { CurrencyEnum, ResponseError } from "shared/utils/types";

import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection, IHistorySection } from "./program-details.types";

class _ProgramDetailsPage extends PureComponent<Props, State> {
  state = {
    hasError: false,
    isPending: false,
    description: undefined,
    profitChart: undefined,
    balanceChart: undefined,
    statistic: undefined
  };

  componentDidMount() {
    this.updateDetails()
      .then(data => getProgramStatistic(data.id))
      .then(data => {
        this.setState({ isPending: false, ...data });
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
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
      isAuthenticated
    } = this.props;
    const {
      hasError,
      description,
      statistic,
      profitChart,
      balanceChart
    } = this.state;
    if (hasError) return <NotFoundPage />;
    return (
      <ProgramDetailsContainer
        condition={!!description}
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
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { accountSettings, authData } = state;
  return {
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

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
}

const ProgramDetailsPage = compose<ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramDetailsPage);
export default ProgramDetailsPage;
