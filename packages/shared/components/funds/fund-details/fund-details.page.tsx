import "shared/components/details/details.scss";

import { FundBalanceChart, FundDetailsFull } from "gv-api-web";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { redirectToLogin } from "shared/components/auth/login/login.service";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import FundDetailsDescriptionSection from "shared/components/funds/fund-details/fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "shared/components/funds/fund-details/fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistic-section";
import {
  fetchFundStructure,
  getFundDescription,
  getFundStatistic
} from "shared/components/funds/fund-details/services/fund-details.service";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import Page from "shared/components/page/page";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import RootState from "shared/reducers/root-reducer";
import { ResponseError } from "shared/utils/types";

import { IDescriptionSection } from "./fund-details.types";
import {
  FundDetailsProfitChart,
  FundDetailsStatistic
} from "./services/fund-details.types";

class FundDetailsPage extends PureComponent<Props, State> {
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

    if (hasError) {
      return <NotFoundPage />;
    }

    if (!description) return null;

    const fetchHistoryPortfolioEvents = (filters: any) =>
      historySection.fetchPortfolioEvents({
        ...filters,
        assetId: description.id
      });

    const isInvested =
      description.personalFundDetails &&
      description.personalFundDetails.isInvested;
    return (
      <Page title={description.title}>
        <ProgramDetailContext.Provider
          value={{
            updateDetails: this.updateDetails
          }}
        >
          <div className="details">
            <div className="details__section">
              <FundDetailsDescriptionSection
                fundDescription={description}
                isAuthenticated={isAuthenticated}
                accountCurrency={currency}
                redirectToLogin={service.redirectToLogin}
                FundControls={descriptionSection.FundControls}
                FundWithdrawContainer={
                  descriptionSection.FundWithdrawalContainer
                }
              />
            </div>
            <div className="details__section">
              <FundDetailsStatisticSection
                getFundStatistic={getFundStatistic}
                programId={description.id}
                currency={currency}
                statistic={statistic}
                profitChart={profitChart}
                balanceChart={balanceChart}
              />
            </div>
            <div className="details__history">
              <FundDetailsHistorySection
                id={description.id}
                fetchFundStructure={fetchFundStructure}
                fetchPortfolioEvents={fetchHistoryPortfolioEvents}
                fetchHistoryCounts={historySection.fetchHistoryCounts}
                eventTypeFilterValues={historySection.eventTypeFilterValues}
                isInvested={isInvested}
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
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
  service: bindActionCreators({ getFundDescription, redirectToLogin }, dispatch)
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
  historySection: IHistorySection;
}

interface StateProps {
  isAuthenticated: boolean;
  currency: string;
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

export default compose<ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundDetailsPage);
