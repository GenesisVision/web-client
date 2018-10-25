import { toggleFavoriteFund } from "modules/favorite-asset/services/favorite-fund.service";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import React, { Fragment, PureComponent } from "react";

import FundDetailsDescription from "./fund-details-description/fund-details-description";

const composeInvestmentData = fundDetails => {
  const { statistic, personalFundDetails } = fundDetails;

  const { balanceGVT, profitPercent } = statistic;
  return {
    fundId: fundDetails.id,
    investedAmount: personalFundDetails.invested,
    value: personalFundDetails.value,
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
      .catch(e => {
        this.setState({
          fundDescription: composeNewFavoriteState(isFavorite)
        });
      })
      .finally(() => {
        this.setState({
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
    return (
      <Fragment>
        <FundDetailsDescription
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          isInvested={isInvested}
          fundDescription={fundDescription}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
          composeInvestmentData={composeInvestmentData}
          onChangeInvestmentStatus={onChangeInvestmentStatus}
        />
      </Fragment>
    );
  }
}

export default FundDetailsDescriptionSection;
