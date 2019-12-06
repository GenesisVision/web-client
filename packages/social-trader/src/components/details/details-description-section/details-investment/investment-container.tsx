import "./details-investment.scss";

import { IFundWithdrawalContainerProps } from "pages/funds/fund-details/fund-details.types";
import * as React from "react";
import { ASSET, STATUS } from "shared/constants/constants";
import { CurrencyEnum, FeesType } from "utils/types";

import { InvestmentDetails } from "./details-investment.helpers";
import Investment from "./investment";

const _InvestmentContainer: React.FC<Props> = ({
  fees,
  updateDescription,
  id,
  assetCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ReinvestingWidget
}) => {
  return (
    <div className="details-investment__investment-container">
      {haveActiveInvestment(personalDetails) && (
        <Investment
          fees={fees}
          updateDescription={updateDescription}
          id={id}
          assetCurrency={assetCurrency}
          asset={asset}
          notice={notice}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ReinvestingWidget={ReinvestingWidget}
        />
      )}
      {haveSubscription(personalDetails) &&
        {
          /*<SubscriptionDetailsContainer
          id={id}
          currency={assetCurrency}
          personalDetails={personalDetails as PersonalProgramDetails}
        />*/
        }}
    </div>
  );
};

interface Props {
  fees: FeesType;
  updateDescription: () => void;
  asset: ASSET;
  notice?: string;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer?: React.ComponentType<IFundWithdrawalContainerProps>;
  ReinvestingWidget?: React.ComponentType<any>;
}

export const haveActiveInvestment = (details: InvestmentDetails): boolean =>
  !!details && details.isInvested && details.status !== STATUS.ENDED;

export const haveSubscription = (details: InvestmentDetails): boolean => false;

const InvestmentContainer = React.memo(_InvestmentContainer);
export default InvestmentContainer;
