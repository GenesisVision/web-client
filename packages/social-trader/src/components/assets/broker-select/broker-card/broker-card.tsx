import "./broker-card.scss";

import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import TagBrokerContainer from "components/tags/tag-broker-container/tag-broker-container";
import { Tag } from "gv-api-web";
import * as React from "react";

import BrokerCardAdornment from "./broker-card-adornment";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import { slugBrokerName } from "./broker-card.helpers";

const _BrokerCard: React.FC<Props> = ({
  logo,
  brokerName,
  onSelect,
  isSelected,
  cardState,
  tags
}) => {
  const isActive = [
    BROKER_CARD_EXTRA_STATE.NONE,
    BROKER_CARD_EXTRA_STATE.KYC_REQUIRED
  ].includes(cardState);
  const className = classNames("broker-card", {
    "broker-card--clickable": !!onSelect,
    "broker-card--active": isActive,
    "broker-card--inactive": !isActive
  });
  let logoClassName = classNames(
    "broker-card__logo",
    "broker-card__logo--" + slugBrokerName(brokerName)
  );

  return (
    <div
      className={className}
      onClick={isActive ? onSelect && onSelect(brokerName) : undefined}
    >
      {isSelected && (
        <div className="broker-card__selected-mark"> &#10004;</div>
      )}
      <BrokerCardAdornment
        condition={cardState !== BROKER_CARD_EXTRA_STATE.NONE}
        cardState={cardState}
      />
      <ImageBase className={logoClassName} src={logo} alt={brokerName} />
      <TagBrokerContainer
        tags={tags!}
        condition={tags && tags.length !== 0}
        className="broker-card__tags"
      />
    </div>
  );
};

const BrokerCard = React.memo(_BrokerCard);
export default BrokerCard;

interface Props {
  logo: string;
  brokerName: string;
  onSelect?(brokerName: string): () => void;
  cardState: BROKER_CARD_EXTRA_STATE;
  tags?: Tag[];
  isSelected?: boolean;
}
