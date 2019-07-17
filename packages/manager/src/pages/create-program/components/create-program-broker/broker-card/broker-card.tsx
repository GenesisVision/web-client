import "./broker-card.scss";

import classnames from "classnames";
import { ProgramTag } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import TagBrokerContainer from "shared/components/tags/tag-broker-container/tag-broker-container";
import filesService from "shared/services/file-service";

import BrokerCardAdornment from "./broker-card-adornment";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import { slugBrokerName } from "./broker-card.helpers";

const _BrokerCard: React.FC<OwnProps & WithTranslation> = ({
  logo,
  t,
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
  const className = classnames("broker-card", {
    "broker-card--clickable": !!onSelect,
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
      <BrokerCardAdornment
        condition={cardState !== BROKER_CARD_EXTRA_STATE.NONE}
        cardState={cardState}
      />
      <img
        className={logoClassName}
        src={filesService.getFileUrl(logo)}
        alt={brokerName}
      />
      <TagBrokerContainer
        tags={tags}
        condition={tags.length !== 0}
        className="broker-card__tags"
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
  tags: ProgramTag[];
}
