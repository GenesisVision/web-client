import "./info-list.scss";

import classNames from "classnames";
import React from "react";
import BrokerAdvantage from "routes/ssr/landing-page/components/broker-info/broker-advantage";
import TradeTab from "routes/ssr/landing-page/images/tabs/trade-tab.png";
import { TInfoList } from "routes/ssr/landing-page/static-data/info";
import { TRADE } from "routes/trade.routes";

import InfoItem from "./info-item";

interface Props extends TInfoList {
  className?: string;
}

const _InfoList: React.FC<Props> = ({ className, listItems }) => (
  <ul className={classNames("info-list", className)}>
    {listItems.map((item, index) => (
      <InfoItem
        key={index}
        texts={item.texts}
        image={item.image}
        button={item.button}
      />
    ))}
    {/*<InfoItem*/}
    {/*  image={TradeTab}*/}
    {/*  textBold={"William is here, you can too"}*/}
    {/*  button={{ link: TRADE, text: "Join" }}*/}
    {/*/>*/}
  </ul>
);

const InfoList = React.memo(_InfoList);
export default InfoList;
