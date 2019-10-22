import { PersonalProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import FollowButton from "./follow-button";
import UnFollowButton from "./unfollow-button";

const _SignalProviderButtons: React.FC<Props> = ({
  personalDetails,
  id,
  title,
  currency
}) => {
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {personalDetails.signalSubscription.hasActiveSubscription ? (
        <UnFollowButton id={id} />
      ) : (
        <FollowButton
          signalSubscription={personalDetails.signalSubscription}
          id={id}
          title={title}
          currency={currency}
        />
      )}
    </div>
  );
};

interface Props {
  personalDetails: PersonalProgramDetailsFull;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const SignalProviderButtons = withLoader(React.memo(_SignalProviderButtons));
export default SignalProviderButtons;
