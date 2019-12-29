import SignalProviderControls from "components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { InvestmentUnauthButton } from "modules/investment-unauth-button/investment-unauth-button";
import { ProgramDescriptionDataType } from "pages/programs/program-details/program-details.types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { ASSET } from "shared/constants/constants";

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  isOwnAsset,
  onApply,
  description: {
    publicInfo: { title },
    tradingAccountInfo: { currency, leverageMax },
    followDetails: { personalDetails, signalSettings },
    id,
    brokerDetails
  }
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
  description: ProgramDescriptionDataType;
}

const FollowControls = React.memo(_FollowControls);
export default FollowControls;
