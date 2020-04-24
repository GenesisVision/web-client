import SignalProviderControls from "components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import {
  AssetPublicDetails,
  BrokerDetails,
  FollowDetailsFull,
  ProgramFollowDetailsFullTradingAccountDetails
} from "gv-api-web";
import { InvestmentUnauthButton } from "modules/investment-unauth-button/investment-unauth-button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { composeFollowDetailsUrl } from "utils/compose-url";

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  isOwnAsset,
  onApply,
  publicInfo: { title },
  tradingAccountInfo: { currency, leverageMax },
  followDetails: { personalDetails, signalSettings },
  id,
  brokerDetails
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <SignalProviderControls>
      <SignalInfo
        successFee={signalSettings.signalSuccessFee}
        volumeFee={signalSettings.signalVolumeFee}
      />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
        {isAuthenticated ? (
          !isOwnAsset && (
            <SignalProviderButtons
              onApply={onApply}
              guestActions={personalDetails && personalDetails.guestActions}
              leverage={leverageMax}
              brokerId={brokerDetails.id}
              broker={brokerDetails.type}
              id={id}
              currency={currency}
            />
          )
        ) : (
          <InvestmentUnauthButton
            label={t("program-details-page.description.follow-trade")}
            asset={ASSET.FOLLOW}
            header={t("program-details-page.description.follow-trade")}
            message={t("unauth-popup.follow")}
            title={title}
          />
        )}
      </div>
    </SignalProviderControls>
  );
};

interface Props {
  isOwnAsset: boolean;
  onApply: VoidFunction;
  publicInfo: AssetPublicDetails;
  tradingAccountInfo: ProgramFollowDetailsFullTradingAccountDetails;
  followDetails: FollowDetailsFull;
  id: string;
  brokerDetails: BrokerDetails;
}

const FollowControls = React.memo(Crashable(_FollowControls));
export default FollowControls;
