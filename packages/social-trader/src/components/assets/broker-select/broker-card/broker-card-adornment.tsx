import ConfirmPopup from "components/confirm-popup/confirm-popup";
import HelpButton from "components/help-button/help-button";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import styles from "./broker-card.module.scss";

const _BrokerCardAdornment: React.FC<OwnProps & WithTranslation> = ({
  t,
  cardState
}) => {
  const [isOpenPopup, setIsOpen] = React.useState(false);
  return (
    <div className={styles["broker-card__adornment-text"]}>
      <MutedText small>
        <Row>
          <RowItem small>
            {t(`create-program-page.broker-card.${cardState}`)}
          </RowItem>
          {cardState === BROKER_CARD_EXTRA_STATE.KYC_REQUIRED && (
            <HelpButton muted onClick={() => setIsOpen(true)} />
          )}
        </Row>
      </MutedText>
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
    </div>
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
