import "shared/components/details/details.scss";

import { ProgramBalanceChart, ProgramDetailsFull } from "gv-api-web";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";
import { redirectToLogin } from "shared/components/auth/login/login.service";
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
import { ResponseError } from "shared/utils/types";
import { IDescriptionSection, IHistorySection } from "./program-details.types";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import ProgramDetailsContainer from "./program-details.contaner";

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
      .then(data => {
        this.setState({ isPending: true });
        return getProgramStatistic(data.id);
      })
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
      .then(data => {
        this.setState({ isPending: false, description: data });
        return data;
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
        updateDetails={this.updateDetails}
        redirectToLogin={service.redirectToLogin}
        historySection={historySection}
        descriptionSection={descriptionSection}
        description={description}
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
    currency: accountSettings.currency as CURRENCIES,
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
  currency: CURRENCIES;
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
