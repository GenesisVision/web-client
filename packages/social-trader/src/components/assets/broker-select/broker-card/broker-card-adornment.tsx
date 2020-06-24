import ConfirmPopup from "components/confirm-popup/confirm-popup";
import HelpButton from "components/help-button/help-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import styles from "./broker-card.module.scss";

interface Props {
  cardState: BROKER_CARD_EXTRA_STATE;
}

const _BrokerCardAdornment: React.FC<Props> = ({ cardState }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpen] = React.useState(false);
  return (
    <div className={styles["broker-card__adornment-text"]}>
      <Text muted size={"small"}>
        <Row>
          <RowItem small>
            {t(`create-program-page:broker-card.${cardState}`)}
          </RowItem>
          {cardState === BROKER_CARD_EXTRA_STATE.KYC_REQUIRED && (
            <HelpButton muted onClick={() => setIsOpen(true)} />
          )}
        </Row>
      </Text>
      <ConfirmPopup
        header={t("create-account:settings.kyc-required")}
        open={isOpenPopup}
        onApply={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        body={
          <>
            <div>{t("create-account:settings.kyc-required-text-1")}</div>
            <div>{t("create-account:settings.kyc-required-text-2")}</div>
          </>
        }
        applyButtonText={t("buttons.close")}
      />
    </div>
  );
};

const BrokerCardAdornment = React.memo(_BrokerCardAdornment);
export default BrokerCardAdornment;
