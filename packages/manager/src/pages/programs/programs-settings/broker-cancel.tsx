import { Broker, MigrationRequest } from "gv-api-web";
import BrokerCard from "pages/create-program/components/create-program-broker/broker-card/broker-card";
import { BROKER_CARD_EXTRA_STATE } from "pages/create-program/components/create-program-broker/broker-card/broker-card.constants";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import useIsOpen from "shared/hooks/is-open.hook";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";

const _BrokerCancel: React.FC<Props> = ({
  onSubmit,
  t,
  brokerFrom,
  brokerTo,
  currentAccountTypeId,
  leverage,
  newLeverage
}) => {
  const [
    isCancelChangeBrokerOpen,
    setCancelChangeBrokerOpen,
    setCancelChangeBrokerClose
  ] = useIsOpen();
  return (
    <div>
      <h3>{t("manager.program-settings.broker.title")}</h3>
      <div className="program-edit__block-wrapper program-edit__block-wrapper--broker-list">
        <div className="program-edit__broker-info">
          <BrokerCard
            logo={brokerFrom.logo}
            key={brokerFrom.name}
            brokerName={brokerFrom.name}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
            tags={brokerFrom.tags}
          />
          <StatisticItem
            label={t(
              "manager.create-program-page.settings.fields.account-type"
            )}
          >
            {
              brokerFrom.accountTypes.find(
                account => account.id === currentAccountTypeId
              )!.name
            }
          </StatisticItem>
          <StatisticItem
            label={t(
              "manager.create-program-page.settings.fields.brokers-leverage"
            )}
          >
            {leverage}
          </StatisticItem>
        </div>
        <div className="broker-card__next-arrow">&rarr;</div>
        <div className="program-edit__broker-info">
          <BrokerCard
            logo={brokerTo.logo}
            key={brokerTo.name}
            brokerName={brokerTo.name}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
            tags={brokerTo.tags}
          />
          <StatisticItem
            label={t(
              "manager.create-program-page.settings.fields.account-type"
            )}
          >
            {brokerTo.accountTypes[0].name}
          </StatisticItem>
          <StatisticItem
            label={t(
              "manager.create-program-page.settings.fields.brokers-leverage"
            )}
          >
            {newLeverage}
          </StatisticItem>
        </div>
      </div>
      <p className="program-edit__text program-edit__text--color-accent program-edit__text--padding-top">
        {t("manager.program-settings.broker.text-cancel", {
          brokerFrom: brokerFrom.name,
          brokerTo: brokerTo.name
        })}
      </p>
      <GVButton
        color="primary"
        className="invest-form__submit-button"
        onClick={setCancelChangeBrokerOpen}
      >
        {t("manager.program-settings.buttons.cancel-broker")}
      </GVButton>
      <CancelChangeBroker
        open={isCancelChangeBrokerOpen}
        onClose={setCancelChangeBrokerClose}
        onApply={onSubmit}
        brokerFrom={brokerFrom.name}
        brokerTo={brokerTo.name}
      />
    </div>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit: () => void;
  brokerFrom: Broker;
  brokerTo: Broker;
  currentAccountTypeId: string;
  leverage: number;
  newLeverage: number;
}

const BrokerCancel = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_BrokerCancel);
export default BrokerCancel;
