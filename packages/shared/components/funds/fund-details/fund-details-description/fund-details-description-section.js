import React, { Fragment, PureComponent } from "react";
import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";
import { FUND } from "shared/constants/constants";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";

const composeInvestmentData = fundDetails => {
  const { statistic, personalFundDetails } = fundDetails;
  const { balanceGVT, profitPercent } = statistic;
  return {
    id: fundDetails.id,
    balanceAmount: balanceGVT.amount,
    balanceCurrency: balanceGVT.currency,
    profitPercent,
    ...personalFundDetails
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
    if (state.prevProps !== props.fundDescription) {
      newState.prevProps = props.fundDescription;
      newState.fundDescription = props.fundDescription;
      newState.ui = { isPending: props.fundDescription };
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
      .then(() => this.setState({ ui: { ...ui, isFavoritePending: false } }))
      .catch(e =>
        this.setState({
          fundDescription: composeNewFavoriteState(isFavorite),
          ui: { ...ui, isFavoritePending: false }
        })
      );
  };

  render() {
    const { fundDescription, ui } = this.state;
    if (!fundDescription) return null;
    return (
      <Fragment>
        <FundDetailsDescription
          FUND={FUND}
          fundDescription={fundDescription}
          onFavoriteClick={this.handleOnFavoriteClick}
          isFavoritePending={ui.isFavoritePending}
          investmentData={composeInvestmentData(fundDescription)}
          {...fundDescription.personalFundDetails}
          {...this.props}
        />
      </Fragment>
    );
  }
}

export default FundDetailsDescriptionSection;
