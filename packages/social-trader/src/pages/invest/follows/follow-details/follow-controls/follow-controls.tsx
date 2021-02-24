import SignalProviderControls from "components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
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

import SignalInfo from "../follow-details-description/signal-info";
import SignalProviderButtons from "../signal-provider-buttons";

const _FollowControls: React.FC<Props> = ({
  renderAssetPopup,
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
      <Row>
        <DetailsStatisticContainer>
          {isAuthenticated ? (
            !isOwnAsset && (
              <SignalProviderButtons
                title={title}
                renderAssetPopup={renderAssetPopup}
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
                label={t("asset-details:description.follow-trade")}
                asset={ASSET.FOLLOW}
                header={t("asset-details:description.follow-trade")}
                message={t("asset-details:unauth-popup.follow")}
                title={title}
              />
            )}
        </DetailsStatisticContainer>
      </Row>
    </SignalProviderControls>
  );
};

interface Props {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  isOwnAsset: boolean;
  onApply: VoidFunction;
  publicInfo: AssetPublicDetails;
  tradingAccountInfo: ProgramFollowDetailsFullTradingAccountDetails;
  followDetails: FollowDetailsFull;
  id: string;
  brokerDetails: BrokerDetails;
}

const FollowControls = React.memo(_FollowControls);
export default FollowControls;
