import classNames from "classnames";
import React from "react";
import { TBrokerItem } from "routes/ssr/landing-page/static-data/brokers";

const _BrokerAdvantage: React.FC<TBrokerItem> = ({ text, number, imageBg }) => {
  const style = imageBg ? { backgroundImage: `url(${imageBg})` } : {};
  return (
    <li
      className={classNames("broker-info__advantage", {
        "broker-info__advantage--bg": imageBg
      })}
      style={style}
    >
      {number && <div className="broker-info__advantage-number">{number}</div>}
      <div className="broker-info__advantage-text">{text}</div>
    </li>
  );
};
const BrokerAdvantage = React.memo(_BrokerAdvantage);
export default BrokerAdvantage;
