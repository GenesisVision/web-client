import { toggleFavoriteFund } from "modules/favorite-asset/services/favorite-fund.service";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import React, { Fragment, PureComponent } from "react";

import FundDetailsDescription from "./fund-details-description/fund-details-description";
import FundDetailsInvestment from "./fund-details-investment/fund-details-investment";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;

  const { balanceBase, profitPercent } = statistic;

  return {
    programId: programDetails.id,
    investedAmount: personalProgramDetails.value,
    balanceAmount: balanceBase.amount,
    balanceCurrency: balanceBase.currency,
    profitPercent,
    status: personalProgramDetails.investmentProgramStatus
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
    const { id, personalProgramDetails } = fundDescription;
    const { isReinvest } = personalProgramDetails;

    const composeNewReinvestState = newState => ({
      ...fundDescription,
      personalProgramDetails: {
        ...personalProgramDetails,
        isReinvest: !isReinvest
      }
    });

    this.setState({
      ui: { ...ui, isReinvestPending: true },
      fundDescription: composeNewReinvestState(!isReinvest)
    });
    toggleReinvesting(id, isReinvest)
      .catch(e => {
        this.setState({
          fundDescription: composeNewReinvestState(isReinvest)
        });
      })
      .finally(() => {
        this.setState({
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
    const { isAuthenticated, redirectToLogin } = this.props;
    const { fundDescription, ui } = this.state;
    if (!fundDescription) return null;
    const isInvested =
      fundDescription.personalProgramDetails &&
      fundDescription.personalProgramDetails.isInvested;
    return (
      <Fragment>
        <FundDetailsDescription
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
          isInvested={isInvested}
          fundDescription={fundDescription}
          onReinvestingClick={this.handleOnReinvestingClick}
          isReinvestPending={ui.isReinvestPending}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
        />
        {isInvested && (
          <FundDetailsInvestment
            className={"fund-details-description__your-investment"}
            {...composeInvestmentData(fundDescription)}
          />
        )}
      </Fragment>
    );
  }
}

export default FundDetailsDescriptionSection;
