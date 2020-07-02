import clsx from "clsx";
import ImageBase from "components/avatar/image-base";
import TagBrokerContainer from "components/tags/tag-broker-container/tag-broker-container";
import { Tag } from "gv-api-web";
import * as React from "react";

import BrokerCardAdornment from "./broker-card-adornment";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import { slugBrokerName } from "./broker-card.helpers";
import styles from "./broker-card.module.scss";

interface Props {
  logo: string;
  brokerName: string;
  onSelect?: (brokerName: string) => () => void;
  cardState: BROKER_CARD_EXTRA_STATE;
  tags?: Tag[];
  isSelected?: boolean;
}

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
  const className = clsx(styles["broker-card"], {
    [styles["broker-card--clickable"]]: !!onSelect,
    [styles["broker-card--active"]]: isActive,
    [styles["broker-card--inactive"]]: !isActive
  });
  let logoClassName = clsx(
    styles["broker-card__logo"],
    styles["broker-card__logo--" + slugBrokerName(brokerName)]
  );

  return (
    <div
      className={className}
      onClick={isActive ? onSelect && onSelect(brokerName) : undefined}
    >
      {isSelected && (
        <div className={styles["broker-card__selected-mark"]}> &#10004;</div>
      )}
      {cardState !== BROKER_CARD_EXTRA_STATE.NONE && (
        <BrokerCardAdornment cardState={cardState} />
      )}
      <ImageBase className={logoClassName} src={logo} alt={brokerName} />
      <TagBrokerContainer
        tags={tags!}
        condition={tags && tags.length !== 0}
        className={styles["broker-card__tags"]}
      />
    </div>
  );
};

const BrokerCard = React.memo(_BrokerCard);
export default BrokerCard;
