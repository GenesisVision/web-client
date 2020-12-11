import { BROKER_CARD_EXTRA_STATE } from "components/assets/asset.constants";
import BrokerCard from "components/assets/broker-select/broker-card/broker-card";
import styles from "components/assets/broker-select/broker-card/broker-card.module.scss";
import FormTextField from "components/assets/fields/form-text-field";
import { Button } from "components/button/button";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  BrokerAccountType,
  BrokersProgramInfo,
  MigrationRequest
} from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { HuobiWarning } from "pages/invest/programs/programs-settings/change-broker/change-broker-form.helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

import ConfirmCancelChangeBroker from "./confirm-cancel-change-broker";

const _CancelChangeBrokerForm: React.FC<Props> = ({
  errorMessage,
  isSignalProgram,
  onSubmit,
  data: { brokers, currentAccountTypeId },
  leverage,
  migration: { newBroker: brokerTo, newLeverage }
}) => {
  const [t] = useTranslation();
  const [
    isCancelChangeBrokerOpen,
    setCancelChangeBrokerOpen,
    setCancelChangeBrokerClose
  ] = useIsOpen();
  const brokerFrom = safeGetElemFromArray(
    brokers,
    broker =>
      !!safeGetElemFromArray(
        broker.accountTypes,
        accountType => accountType.id === currentAccountTypeId
      )
  );
  return (
    <div>
      <Row wrap center={false}>
        <RowItem>
          <BrokerCard
            logo={brokerFrom.logoUrl}
            key={brokerFrom.name}
            brokerName={brokerFrom.name}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
            tags={brokerFrom.tags}
          />
          <Row>
            <LabeledValue label={t("asset-settings:fields.brokers-leverage")}>
              {leverage}
            </LabeledValue>
          </Row>
          <Row>
            <LabeledValue label={t("asset-settings:fields.account-type")}>
              {
                safeGetElemFromArray(
                  brokerFrom.accountTypes,
                  (account: BrokerAccountType) =>
                    account.id === currentAccountTypeId
                ).name
              }
            </LabeledValue>
          </Row>
        </RowItem>
        <RowItem className={styles["broker-card__next-arrow"]}>&rarr;</RowItem>
        <RowItem>
          <BrokerCard
            logo={brokerTo.logoUrl}
            key={brokerTo.name}
            brokerName={brokerTo.name}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
            tags={brokerTo.tags}
          />
          <Row>
            <LabeledValue label={t("asset-settings:fields.account-type")}>
              {brokerTo.accountTypes[0].name}
            </LabeledValue>
          </Row>
          <Row>
            <LabeledValue label={t("asset-settings:fields.brokers-leverage")}>
              {newLeverage}
            </LabeledValue>
          </Row>
        </RowItem>
      </Row>
      <HuobiWarning
        from={brokerFrom.name}
        to={brokerTo.name}
        isSignalProgram={isSignalProgram}
      />
      <Row>
        <FormTextField>
          {t("asset-settings:broker.text-cancel", {
            brokerFrom: brokerFrom.name,
            brokerTo: brokerTo.name
          })}
        </FormTextField>
      </Row>
      <Row size={"large"}>
        <Button color="primary" onClick={setCancelChangeBrokerOpen}>
          {t("asset-settings:buttons.cancel-broker")}
        </Button>
      </Row>
      <ConfirmCancelChangeBroker
        errorMessage={errorMessage}
        open={isCancelChangeBrokerOpen}
        onClose={setCancelChangeBrokerClose}
        onApply={onSubmit}
        brokerFrom={brokerFrom.name}
        brokerTo={brokerTo.name}
      />
    </div>
  );
};

interface Props extends CancelChangeBrokerFormOwnProps {}

export interface CancelChangeBrokerFormOwnProps {
  errorMessage?: string;
  data: BrokersProgramInfo;
  isSignalProgram: boolean;
  onSubmit: () => Promise<void>;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerForm = withBlurLoader(
  React.memo(_CancelChangeBrokerForm)
);
export default CancelChangeBrokerForm;
