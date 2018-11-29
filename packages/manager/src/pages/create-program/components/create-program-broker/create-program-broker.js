import "./create-program-broker.scss";

import Surface from "shared/components/surface/surface";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

import BrokerCard from "./broker-card/broker-card";
import { comingSoonBrokers } from "./coming-soon-brokers";

const getLeverageDescription = ({ leverageMax, leverageMin }) => {
  let result;

  if (leverageMin === leverageMax) {
    result = "1:" + leverageMin;
  } else {
    result = `1:${leverageMin} - 1:${leverageMax}`;
  }

  return result;
};

const CreateProgramBroker = ({
  t,
  brokers,
  navigateToSettings,
  choosedBroker,
  chooseBroker
}) => (
  <div className="create-program-broker-container">
    <div className="create-program-broker">
      <div className="create-program-broker__list">
        {brokers.map(broker => (
          <BrokerCard
            key={broker.name + broker.description}
            broker={broker}
            isActive={broker === choosedBroker}
            onChoose={chooseBroker}
          />
        ))}
        {comingSoonBrokers.map(broker => (
          <BrokerCard key={broker.name} broker={broker} isComingSoon={true} />
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
            {t("create-program-page.broker-info.about")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.description}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("create-program-page.broker-info.terms")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.terms}
          </div>
        </div>
        <div className="create-program-broker__row create-program-broker__row--small">
          <div className="create-program-broker__info-title">
            {t("create-program-page.broker-info.leverage")}
          </div>
          <div className="create-program-broker__info-text">
            {getLeverageDescription(choosedBroker)}
          </div>
        </div>
        <div className="create-program-broker__row create-program-broker__row--small">
          <div className="create-program-broker__info-title">
            {t("create-program-page.broker-info.fee")}
          </div>
          <div className="create-program-broker__info-text">
            {choosedBroker.fee} %
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("create-program-page.broker-info.assets")}
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
