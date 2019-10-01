import "./details-investment.scss";

import * as React from "react";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import SubscriptionDetailsContainer from "shared/components/programs/program-details/program-details-description/subscription-details/subscription-details-container";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { STATUS } from "shared/constants/constants";
import { CurrencyEnum, FeesType } from "shared/utils/types";

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
  ProgramReinvestingWidget
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
          ProgramReinvestingWidget={ProgramReinvestingWidget}
        />
      )}
      {haveSubscription(personalDetails) && (
        <SubscriptionDetailsContainer
          id={id}
          currency={assetCurrency}
          personalDetails={personalDetails}
        />
      )}
    </div>
  );
};

interface Props {
  fees: FeesType;
  updateDescription: () => void;
  asset: string;
  notice?: string;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

export const haveActiveInvestment = (details: InvestmentDetails): boolean =>
  !!details && details.isInvested && details.status !== STATUS.ENDED;

export const haveSubscription = (details: InvestmentDetails): boolean =>
  !!details &&
  !!details.signalSubscription &&
  details.signalSubscription.hasActiveSubscription;

const InvestmentContainer = React.memo(_InvestmentContainer);
export default InvestmentContainer;
