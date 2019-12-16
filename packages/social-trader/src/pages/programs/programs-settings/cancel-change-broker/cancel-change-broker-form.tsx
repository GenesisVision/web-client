import { BROKER_CARD_EXTRA_STATE } from "components/assets/asset.constants";
import BrokerCard from "components/assets/broker-select/broker-card/broker-card";
import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import StatisticItem from "components/statistic-item/statistic-item";
import { Broker, BrokerAccountType, MigrationRequest } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

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
            label={t("create-program-page.settings.fields.account-type")}
          >
            {
              brokerFrom.accountTypes.find(
                (account: BrokerAccountType) =>
                  account.id === currentAccountTypeId
              )!.name
            }
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.settings.fields.brokers-leverage")}
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
            label={t("create-program-page.settings.fields.account-type")}
          >
            {brokerTo.accountTypes[0].name}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.settings.fields.brokers-leverage")}
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
      <FormTextField topPadding>
        {t("program-settings.broker.text-cancel", {
          brokerFrom: brokerFrom.name,
          brokerTo: brokerTo.name
        })}
      </FormTextField>
      <GVButton
        color="primary"
        className="invest-form__submit-button"
        onClick={setCancelChangeBrokerOpen}
      >
        {t("program-settings.buttons.cancel-broker")}
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
