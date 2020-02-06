import "./info-list.scss";

import classNames from "classnames";
import BrokerAdvantage from "pages/landing-page/components/broker-info/broker-advantage";
import TradeTab from "pages/landing-page/images/tabs/trade-tab.png";
import { TInfoList } from "pages/landing-page/static-data/info";
import React from "react";
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
