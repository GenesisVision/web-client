import "shared/components/details/details.scss";

import { push } from "connected-react-router";
import { FundDetailsFull } from "gv-api-web";
import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import ReallocateContainer from "modules/reallocate/reallocate-container";
import React, { ComponentType, PureComponent } from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
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
import { FUND, MANAGER } from "shared/constants/constants";
import { ResponseError } from "shared/utils/types";

import { LOGIN_ROUTE } from "../../auth/login/login.routes";
import CloseFundContainer from "./close-fund/close-fund-container";

interface IFundDetailsPageProps {
  isAuthenticated: boolean;
  currency: string;
  service: {
    getFundDescription(): Promise<FundDetailsFull>;
    redirectToLogin(): void;
  };
}

interface IFundDetailsPageState {
  isPending: boolean;
  hasError: boolean;
  description?: FundDetailsFull;
  profitChart?: any;
  balanceChart?: any;
  statistic?: any;
}

class FundDetailsPage extends PureComponent<
  IFundDetailsPageProps,
  IFundDetailsPageState
> {
  constructor(props: IFundDetailsPageProps) {
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

  updateDetails = () => {
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

  getDetails = () => {
    this.updateDetails()
      .then(() => {
        this.setState({ isPending: true });
        return getFundStatistic(this.state.description!.id);
      })
      .then(data => {
        this.setState({ isPending: false, ...data });
      })
      .catch(() => {
        this.setState({ isPending: false });
      });
  };

  render() {
    const { currency, service, isAuthenticated } = this.props;
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
                CloseFundContainer={CloseFundContainer}
                role={MANAGER}
                AssetEditContainer={AssetEditContainer}
                FundDepositContainer={FundDepositContainer}
                FundWithdrawContainer={FundWithdrawalContainer}
                ReallocateContainer={ReallocateContainer}
                fundDescription={description}
                isAuthenticated={isAuthenticated}
                redirectToLogin={service.redirectToLogin}
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
              />
            </div>
          </div>
        </ProgramDetailContext.Provider>
      </Page>
    );
  }
}

const mapStateToProps = (state: ManagerRootState) => {
  const { accountSettings, authData } = state;

  return {
    currency: accountSettings.currency,
    isAuthenticated: authData.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    { getFundDescription, redirectToLogin: () => push(LOGIN_ROUTE) },
    dispatch
  )
});

export default compose<ComponentType<IFundDetailsPageProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundDetailsPage);
