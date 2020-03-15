import classNames from "classnames";
import { useTranslation } from "i18n";
import { TBrokerItem } from "pages/landing-page/static-data/brokers";
import React from "react";

const _BrokerAdvantage: React.FC<TBrokerItem> = ({ text, number, imageBg }) => {
  const { t } = useTranslation();
  const style = imageBg ? { backgroundImage: `url(${imageBg})` } : {};
  return (
    <li
      className={classNames("broker-info__advantage", {
        "broker-info__advantage--bg": imageBg
      })}
      style={style}
    >
      {number && (
        <div className="broker-info__advantage-number">{t(number)}</div>
      )}
      <div className="broker-info__advantage-text">{t(text)}</div>
    </li>
  );
};
const BrokerAdvantage = React.memo(_BrokerAdvantage);
export default BrokerAdvantage;
