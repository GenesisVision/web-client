import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import HelpButton from "shared/components/help-button/help-button";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

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
        open={isOpenPopup}
        onApply={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        body={t("create-program-page.kyc-requirement")}
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
