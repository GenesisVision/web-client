import "shared/components/details/details.scss";

import { FundBalanceChart, FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/login/login.service";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import {
  getFundDescription,
  getFundStatistic
} from "shared/components/funds/fund-details/services/fund-details.service";
import NotFoundPage from "shared/components/not-found/not-found";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, ResponseError } from "shared/utils/types";

import FundDetailsContainer from "./fund-details.container";
import { IDescriptionSection } from "./fund-details.types";
import {
  FundDetailsProfitChart,
  FundDetailsStatistic
} from "./services/fund-details.types";

class FundDetailsPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      isPending: false,
      description: undefined,
      profitChart: undefined,
      balanceChart: undefined,
      statistic: undefined
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  updateDetails = (): Promise<void> => {
    const { service } = this.props;
    this.setState({ isPending: true });
    return service
      .getFundDescription()
      .then(data => {
        this.setState({ isPending: false, description: data });
      })
      .catch((e: ResponseError) => {
        this.setState({ hasError: true });
        throw e;
      });
  };

  getDetails = (): void => {
    this.updateDetails()
      .then(() => {
        this.setState({ isPending: true });
        return getFundStatistic(
          this.state.description!.id,
          this.props.currency
        );
      })
      .then(data => {
        this.setState({ isPending: false, ...data });
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
  };

  render() {
    const {
      historySection,
      currency,
      service,
      isAuthenticated,
      descriptionSection
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
      <FundDetailsContainer
        condition={!!description}
        loader={<DetailsContainerLoader assets />}
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

interface State {
  isPending: boolean;
  hasError: boolean;
  description?: FundDetailsFull;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChart;
  statistic?: FundDetailsStatistic;
}

export default compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundDetailsPage);
