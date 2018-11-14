import React, { Fragment, PureComponent } from "react";

import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";

import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import { FUND } from "modules/asset-edit/asset-edit.constants";
import { toggleFavoriteFund } from "modules/favorite-asset/services/favorite-fund.service";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import FundWithdrawContainer from "modules/fund-withdraw/fund-withdraw-container";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ReallocateContainer from "modules/reallocate/reallocate-container";
import { FundDetailContext } from "pages/funds/fund-details/fund-details.page";

const composeInvestmentData = fundDetails => {
  const { statistic, personalFundDetails } = fundDetails;

  const { balanceGVT, profitPercent } = statistic;
  return {
    pendingInput: personalFundDetails.pendingInput,
    pendingOutput: personalFundDetails.pendingOutput,
    value: personalFundDetails.value,
    id: fundDetails.id,
    investedAmount: personalFundDetails.value,
    balanceAmount: balanceGVT.amount,
    balanceCurrency: balanceGVT.currency,
    profitPercent,
    status: personalFundDetails.status
  };
};
class FundDetailsDescriptionSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ui: {
        isFavoritePending: false,
        isReinvestPending: false,
        isPending: false
      },
      fundDescription: null,
      prevProps: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props.fundDescriptionData) {
      newState.prevProps = props.fundDescriptionData;
      newState.fundDescription = props.fundDescriptionData.data;
      newState.ui = { isPending: props.fundDescriptionData.isPending };
    }

    return newState;
  }

  handleOnReinvestingClick = () => {
    const { ui, fundDescription } = this.state;
    const { id, personalFundDetails } = fundDescription;
    const { isReinvest } = personalFundDetails;

    const composeNewReinvestState = newState => ({
      ...fundDescription,
      personalFundDetails: {
        ...personalFundDetails,
        isReinvest: !isReinvest
      }
    });

    this.setState({
      ui: { ...ui, isReinvestPending: true },
      fundDescription: composeNewReinvestState(!isReinvest)
    });
    toggleReinvesting(id, isReinvest)
      .then(() => {
        this.setState({
          ui: { ...ui, isReinvestPending: false }
        });
      })
      .catch(e => {
        this.setState({
          fundDescription: composeNewReinvestState(isReinvest),
          ui: { ...ui, isReinvestPending: false }
        });
      });
  };

  handleOnFavoriteClick = () => {
    const { ui, fundDescription } = this.state;
    const { id, personalFundDetails } = fundDescription;
    const { isFavorite } = personalFundDetails;
    const composeNewFavoriteState = () => ({
      ...fundDescription,
      personalFundDetails: {
        ...personalFundDetails,
        isFavorite: !isFavorite
      }
    });

    this.setState({
      ui: { ...ui, isFavoritePending: true },
      fundDescription: composeNewFavoriteState()
    });
    toggleFavoriteFund(id, isFavorite)
      .then(() => {
        this.setState({
          ui: { ...ui, isFavoritePending: false }
        });
      })
      .catch(e => {
        this.setState({
          fundDescription: composeNewFavoriteState(isFavorite),
          ui: { ...ui, isFavoritePending: false }
        });
      });
  };

  render() {
    const {
      isAuthenticated,
      redirectToLogin,
      onChangeInvestmentStatus
    } = this.props;
    const { fundDescription, ui } = this.state;
    if (!fundDescription) return null;
    const isInvested =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isInvested;
    const isOwnProgram =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isOwnProgram;
    const canWithdraw =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.canWithdraw;
    const isFavorite =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isFavorite;
    const canCloseProgram =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.canCloseProgram;
    const hasNotifications =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.hasNotifications;
    const status =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.status;
    return (
      <Fragment>
        <FundDetailsDescription
          status={status}
          isFavorite={isFavorite}
          canCloseProgram={canCloseProgram}
          hasNotifications={hasNotifications}
          isOwnProgram={isOwnProgram}
          FUND={FUND}
          ReallocateContainer={ReallocateContainer}
          AssetEditContainer={AssetEditContainer}
          FundDetailContext={FundDetailContext}
          FundWithdrawContainer={FundWithdrawContainer}
          FundDepositContainer={FundDepositContainer}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          isInvested={isInvested}
          canWithdraw={canWithdraw}
          fundDescription={fundDescription}
          onReinvestingClick={this.handleOnReinvestingClick}
          isReinvestPending={ui.isReinvestPending}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
          canInvest={isOwnProgram}
          composeInvestmentData={composeInvestmentData}
          onChangeInvestmentStatus={onChangeInvestmentStatus}
        />
      </Fragment>
    );
  }
}

export default FundDetailsDescriptionSection;
