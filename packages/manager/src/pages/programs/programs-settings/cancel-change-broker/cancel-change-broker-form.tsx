import { Broker, MigrationRequest } from "gv-api-web";
import BrokerCard from "pages/create-program/components/create-program-broker/broker-card/broker-card";
import { BROKER_CARD_EXTRA_STATE } from "pages/create-program/components/create-program-broker/broker-card/broker-card.constants";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import useIsOpen from "shared/hooks/is-open.hook";

import { HuobiWarning } from "../change-broker/change-broker-form";
import ConfirmCancelChangeBroker from "./confirm-cancel-change-broker";

const _CancelChangeBrokerForm: React.FC<Props> = ({
  isSignalProgram,
  onSubmit,
  t,
  brokerFrom,
  currentAccountTypeId,
  leverage,
  migration: { newBroker: brokerTo, newLeverage }
}) => {
  const [
    isCancelChangeBrokerOpen,
    setCancelChangeBrokerOpen,
    setCancelChangeBrokerClose
  ] = useIsOpen();
  return (
    <>
      <div className="program-settings__block-wrapper--broker-list">
        <div className="program-settings__broker-info">
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
        <div className="program-settings__broker-info">
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
      <HuobiWarning
        from={brokerFrom.name}
        to={brokerTo.name}
        isSignalProgram={isSignalProgram}
      />
      <p className="program-settings__text program-settings__text--padding-top">
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
      <ConfirmCancelChangeBroker
        open={isCancelChangeBrokerOpen}
        onClose={setCancelChangeBrokerClose}
        onApply={onSubmit}
        brokerFrom={brokerFrom.name}
        brokerTo={brokerTo.name}
      />
    </>
  );
};

interface Props extends CancelChangeBrokerFormOwnProps, WithTranslation {}

export interface CancelChangeBrokerFormOwnProps {
  isSignalProgram: boolean;
  onSubmit: () => void;
  brokerFrom: Broker;
  currentAccountTypeId: string;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerForm = compose<
  React.ComponentType<CancelChangeBrokerFormOwnProps>
>(
  translate(),
  React.memo
)(_CancelChangeBrokerForm);
export default CancelChangeBrokerForm;
