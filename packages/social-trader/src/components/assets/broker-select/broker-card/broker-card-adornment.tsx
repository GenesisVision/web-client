import ConfirmPopup from "components/confirm-popup/confirm-popup";
import HelpButton from "components/help-button/help-button";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";

const _BrokerCardAdornment: React.FC<OwnProps & WithTranslation> = ({
  t,
  cardState
}) => {
  const [isOpenPopup, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="broker-card__adornment-text">
        <span>{t(`create-program-page.broker-card.${cardState}`)}</span>
        {cardState === BROKER_CARD_EXTRA_STATE.KYC_REQUIRED && (
          <HelpButton onClick={() => setIsOpen(true)} />
        )}
      </div>
      <ConfirmPopup
        header={t("create-account-page.settings.kyc-required")}
        open={isOpenPopup}
        onApply={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        body={
          <>
            <div>{t("create-account-page.settings.kyc-required-text-1")}</div>
            <div>{t("create-account-page.settings.kyc-required-text-2")}</div>
          </>
        }
        applyButtonText={t("buttons.close")}
      />
    </>
  );
};

const BrokerCardAdornment = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  translate(),
  withLoader,
  React.memo
)(_BrokerCardAdornment);

export default BrokerCardAdornment;

interface OwnProps {
  cardState: BROKER_CARD_EXTRA_STATE;
}
