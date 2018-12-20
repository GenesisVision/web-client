import "./broker-card.scss";

import classnames from "classnames";
import React from "react";
import { translate } from "react-i18next";

import { BrokerCardState } from "./broker-card.constants";
import { getBrokerCardImage, slugBrokerName } from "./broker-card.helpers";

const BrokerCard = ({
  t,
  broker,
  onSelect,
  isSelected,
  cardState = BrokerCardState.active
}) => {
  const className = classnames("broker-card", {
    "broker-card--active": cardState === BrokerCardState.active,
    "broker-card--inactive": cardState !== BrokerCardState.active
  });
  let logoClassName = classnames(
    "broker-card__logo",
    "broker-card__logo--" + slugBrokerName(broker.name)
  );

  let renderAdornmentText = () => {
    if (cardState === BrokerCardState.active) return null;

    return (
      <div className="broker-card__adornment-text">
        {t(`manager.create-program-page.broker-card.${cardState}`)}
      </div>
    );
  };

  let isClickable = cardState === BrokerCardState.active;

  return (
    <div className={className} onClick={isClickable ? onSelect(broker) : null}>
      {isSelected && (
        <div className="broker-card__selected-mark"> &#10004;</div>
      )}
      <img
        className={logoClassName}
        src={getBrokerCardImage(broker.name)}
        alt={broker.name}
      />
      {renderAdornmentText()}
    </div>
  );
};

export default translate()(BrokerCard);
