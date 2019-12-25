import "./advantages-list.scss";

import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import TradeTab from "routes/ssr/landing-page/images/tabs/trade-tab.png";
import { TAdvantages } from "routes/ssr/landing-page/static-data/advantages";
import { JOIN_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

import AdvantageItem from "./advantage-item";

interface Props {
  className?: string;
  advantagesItems: TAdvantages[];
}

const _TabInfoList: React.FC<Props> = ({ className, advantagesItems }) => (
  <ul className={classNames("advantages-list", className)}>
    {advantagesItems.map((item, index) => (
      <AdvantageItem
        key={index}
        title={item.title}
        text={item.text}
        image={item.image}
      />
    ))}
    <li className="advantages-list__item-btn">
      <LPButton href={JOIN_ROUTE}>Join</LPButton>
    </li>
  </ul>
);

const AdvantagesList = React.memo(_TabInfoList);
export default AdvantagesList;
