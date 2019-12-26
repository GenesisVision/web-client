import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TBrokerItem } from "routes/ssr/landing-page/static-data/brokers";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  text: string;
  number?: string;
  className?: string;
  imageBg?: string;
}

const _BrokerAdvantage: React.FC<TBrokerItem> = ({ text, number, imageBg }) => (
  <li
    className={classNames("broker-info__advantage", {
      "broker-info__advantage--bg": imageBg
    })}
    style={{ backgroundColor: `url(${imageBg})` }}
  >
    {number && <div className="broker-info__advantage-number">{number}</div>}
    <div className="broker-info__advantage-text">{text}</div>
  </li>
);
const BrokerAdvantage = React.memo(_BrokerAdvantage);
export default BrokerAdvantage;
