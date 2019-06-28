import { Broker, BrokerAccountType } from "gv-api-web";
import BrokerCard from "pages/create-program/components/create-program-broker/broker-card/broker-card";
import React, { useCallback, useState } from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Select from "shared/components/select/select";

import { BROKER_CARD_EXTRA_STATE } from "../../create-program/components/create-program-broker/broker-card/broker-card.constants";

const _BrokerEdit: React.FC<Props> = ({
  t,
  id,
  brokers,
  selectedBroker,
  changeBroker
}) => {
  const [selectedBrokerState, setSelectedBrokerState] = useState<Broker>(
    selectedBroker
  );
  const [leverage, setLeverage] = useState<number>(1);
  const [account, setAccount] = useState<BrokerAccountType>(
    selectedBroker.accountTypes[0]
  );
  const selectBroker = useCallback(
    (brokerName: string) => () => {
      const broker = brokers.find(x => x.name === brokerName);
      setSelectedBrokerState(broker!);
      setAccount(broker!.accountTypes[0]);
    },
    [brokers]
  );
  const changeLeverage = useCallback(
    ({ target }) => setLeverage(target.value),
    []
  );
  const changeAccount = useCallback(
    ({ target }) =>
      setAccount(
        selectedBrokerState.accountTypes.find(
          account => account.name === target.value
        )!
      ),
    [selectedBrokerState]
  );
  return (
    <>
      <h3>Broker</h3>
      <div className="program-edit__block-wrapper program-edit__block-wrapper--broker-list">
        {brokers.map(broker => (
          <BrokerCard
            logo={broker.logo}
            key={broker.name}
            brokerName={broker.name}
            isSelected={broker.name === selectedBrokerState.name}
            onSelect={selectBroker}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
          />
        ))}
      </div>
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("manager.create-program-page.settings.fields.account-type")}
        </label>
        <div className="gv-text-field">
          <Select
            name={"accounts"}
            className="gv-text-field__input"
            value={account.name}
            onChange={changeAccount}
          >
            {selectedBrokerState.accountTypes.map(account => (
              <option value={account.name} key={account.name}>
                {account.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("manager.create-program-page.settings.fields.brokers-leverage")}
        </label>
        <div className="gv-text-field">
          <Select
            name={"leverage"}
            className="gv-text-field__input"
            value={String(leverage)}
            onChange={changeLeverage}
          >
            {account.leverages.map(leverage => (
              <option value={leverage} key={leverage}>
                {leverage}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <p className="program-edit__text program-edit__text--color-accent program-edit__text--padding-top">
        A broker change in the program will occur automatically within 24 hours
        after the end of the reporting period. You will receive a message
        confirming the successful change of the broker and you will receive a
        new login and password from the trading account. The invested funds in
        the program will be transferred to the new broker. All trading history
        and statistics will be saved on the program page.
      </p>
      <GVButton
        color="primary-dark"
        className="invest-form__submit-button"
        onClick={changeBroker(id, selectedBrokerState.accountTypes[0].id, 1)}
      >
        {"Change broker"}
      </GVButton>
    </>
  );
};

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  id: string;
  selectedBroker: Broker;
  brokers: Broker[];
  changeBroker: (
    programId: string,
    newBrokerAccountTypeId: string,
    newLeverage: number
  ) => () => void;
}

const BrokerEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_BrokerEdit);
export default BrokerEdit;
