import "./broker-card.scss";

import classnames from "classnames";
import React from "react";
import { translate } from "react-i18next";

import GMLogo from "../../../media/gm.png";

const BrokerCard = ({ t, broker, onChoose, isActive, isComingSoon }) => {
  const className = classnames("broker-card", {
    "broker-card--active": isActive,
    "broker-card--coming-soon": isComingSoon
  });
  let logoClassName = classnames("broker-card__logo", {
    ["broker-card__logo--" + broker.name]: isComingSoon,
    "broker-card__logo--gm": broker.name === "Genesis Markets"
  });

  return (
    <div
      className={className}
      onClick={!isComingSoon ? onChoose.bind(null, broker) : null}
    >
      <img
        className={logoClassName}
        src={broker.name === "Genesis Markets" ? GMLogo : broker.logo}
        alt={broker.name}
      />
      {isComingSoon && (
        <div className="broker-card__coming-soon-text">
          {t("create-program-page.broker-card.coming-soon")}
        </div>
      )}
      {isActive && <div className="broker-card__active-mark"> &#10004;</div>}
    </div>
  );
};

export default translate()(BrokerCard);
