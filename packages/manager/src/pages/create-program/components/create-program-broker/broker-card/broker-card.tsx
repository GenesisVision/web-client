import "./broker-card.scss";

import classnames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";

import BrokerCardAdornment from "./broker-card-adornment";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import { slugBrokerName } from "./broker-card.helpers";
import filesService from "shared/services/file-service";

const _BrokerCard: React.FC<OwnProps & InjectedTranslateProps> = ({
  logo,
  t,
  brokerName,
  onSelect,
  isSelected,
  cardState
}) => {
  const isActive = [
    BROKER_CARD_EXTRA_STATE.NONE,
    BROKER_CARD_EXTRA_STATE.KYC_REQUIRED
  ].includes(cardState);
  const className = classnames("broker-card", {
    "broker-card--active": isActive,
    "broker-card--inactive": !isActive
  });
  let logoClassName = classnames(
    "broker-card__logo",
    "broker-card__logo--" + slugBrokerName(brokerName)
  );

  return (
    <div
      className={className}
      onClick={isActive ? onSelect!(brokerName) : undefined}
    >
      {isSelected && (
        <div className="broker-card__selected-mark"> &#10004;</div>
      )}
      <img
        className={logoClassName}
        src={filesService.getFileUrl(logo)}
        alt={brokerName}
      />
      <BrokerCardAdornment
        condition={cardState !== BROKER_CARD_EXTRA_STATE.NONE}
        cardState={cardState}
      />
    </div>
  );
};

const BrokerCard = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_BrokerCard);
export default BrokerCard;

interface OwnProps {
  logo: string;
  brokerName: string;
  onSelect?(brokerName: string): () => void;
  isSelected: boolean;
  cardState: BROKER_CARD_EXTRA_STATE;
}
