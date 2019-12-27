import "./advantages-list.scss";

import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TAdvantages } from "routes/ssr/landing-page/static-data/advantages";
import { TRADE } from "routes/trade.routes";

import AdvantageItem from "./advantage-item";

interface Props {
  className?: string;
  advantagesItems: TAdvantages[];
}

const _AdvantagesList: React.FC<Props> = ({ className, advantagesItems }) => (
  <ul className={classNames("advantages-list", className)}>
    {advantagesItems.map((item, index) => (
      <AdvantageItem
        key={index}
        title={item.title}
        text={item.text}
        image={item.image}
      />
    ))}
    <li className="advantages-list__item advantages-list__item--button">
      <LPButton href={TRADE}>Join</LPButton>
    </li>
  </ul>
);

const AdvantagesList = React.memo(_AdvantagesList);
export default AdvantagesList;
