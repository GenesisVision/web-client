import "./create-program-broker.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import BrokerCard from "./broker-card/broker-card";
import { BrokerCardState } from "./broker-card/broker-card.constants";
import { comingSoonBrokers } from "./create-program-broker.constants";

const getLeverageDescription = ({ leverageMax, leverageMin }) => {
  let result;

  if (leverageMin === leverageMax) {
    result = "1:" + leverageMin;
  } else {
    result = `1:${leverageMin} - 1:${leverageMax}`;
  }

  return result;
};

const getAcountTypes = accountTypes => {
  if (!accountTypes[0].currencies) return null;
  return accountTypes[0].currencies.join(", ");
};

const CreateProgramBroker = ({
  t,
  brokers,
  navigateToSettings,
  choosedBroker,
  chooseBroker,
  isForexAllowed
}) => (
  <div className="create-program-broker-container">
    <div className="create-program-broker">
      <div className="create-program-broker__list">
        {brokers.map(broker => (
          <BrokerCard
            key={broker.name + broker.description}
            broker={broker}
            isSelected={broker === choosedBroker}
            onSelect={chooseBroker}
            cardState={
              !isForexAllowed && broker.isForex
                ? BrokerCardState.KYCRequired
                : BrokerCardState.active
            }
          />
        ))}
        {comingSoonBrokers.map(broker => (
          <BrokerCard
            key={broker}
            broker={{ name: broker }}
            cardState={BrokerCardState.comingSoon}
          />
        ))}

        <div className="create-program-broker__navigation">
          <GVButton
            color="primary"
            type="contained"
            onClick={navigateToSettings}
          >
            {t("buttons.continue")}
          </GVButton>
        </div>
      </div>
      <Surface className="surface--horizontal-paddings create-program-broker__description">
        <h3 className="create-program-broker__description-heading">
          {choosedBroker.name}
        </h3>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.about")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.description}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.account-type")}
          </div>
          <div className="create-program-broker__info-text">
            {getAcountTypes(choosedBroker.accountTypes)}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.trading-platform")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.accountTypes[0].type}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.terms")}
          </div>
          <div className="create-program-broker__info-text">
            <a
              href={choosedBroker.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("manager.create-program-page.broker-info.read-terms")}
            </a>
          </div>
        </div>
        <div className="create-program-broker__row create-program-broker__row--small">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.leverage")}
          </div>
          <div className="create-program-broker__info-text">
            {getLeverageDescription(choosedBroker)}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.assets")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.assets}
          </div>
        </div>
      </Surface>
    </div>
  </div>
);

export default translate()(CreateProgramBroker);
