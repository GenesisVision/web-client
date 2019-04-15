import "./broker-card.scss";

import classnames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { BROKER_CARD_STATE } from "./broker-card.constants";
import { getBrokerCardImage, slugBrokerName } from "./broker-card.helpers";

const _BrokerCard: React.FC<OwnProps & InjectedTranslateProps> = ({
  t,
  brokerName,
  onSelect,
  isSelected,
  cardState
}) => {
  const className = classnames("broker-card", {
    "broker-card--active": cardState === BROKER_CARD_STATE.ACTIVE,
    "broker-card--inactive": cardState !== BROKER_CARD_STATE.ACTIVE
  });
  let logoClassName = classnames(
    "broker-card__logo",
    "broker-card__logo--" + slugBrokerName(brokerName)
  );

  let renderAdornmentText = () => {
    if (cardState === BROKER_CARD_STATE.ACTIVE) return null;

    return (
      <div className="broker-card__adornment-text">
        {t(`manager.create-program-page.broker-card.${cardState}`)}
      </div>
    );
  };

  let isClickable = cardState === BROKER_CARD_STATE.ACTIVE;
  return (
    <div
      className={className}
      onClick={isClickable ? onSelect!(brokerName) : undefined}
    >
      {isSelected && (
        <div className="broker-card__selected-mark"> &#10004;</div>
      )}
      <img
        className={logoClassName}
        src={getBrokerCardImage(brokerName)}
        alt={brokerName}
      />
      {renderAdornmentText()}
    </div>
  );
};

const BrokerCard = React.memo(translate()(_BrokerCard));
export default BrokerCard;

interface OwnProps {
  brokerName: string;
  onSelect?(brokerName: string): () => void;
  isSelected: boolean;
  cardState: BROKER_CARD_STATE;
}
