import "./tab-info-list.scss";

import classNames from "classnames";
import React from "react";
import TradeTab from "routes/ssr/landing-page/images/tabs/trade-tab.png";
import { JOIN_ROUTE } from "routes/ssr/landing-page/static-data/nav-links";

import TabInfoItem from "./tab-info-item";

interface Props {
  className?: string;
}

const _TabInfoList: React.FC<Props> = ({ className }) => (
  <ul className={classNames("tab-info-list", className)}>
    <TabInfoItem
      text={"Trade on your favourite "}
      textBold={"Brokerge or Exchange!"}
    />
    <TabInfoItem
      text={"Trade on any market "}
      textBold={"Crypto, Forex or Stocks!"}
    />
    <TabInfoItem
      transparent
      image={TradeTab}
      textBold={"William is here, you can too"}
      button={{ link: JOIN_ROUTE, text: "Join" }}
    />
    <TabInfoItem
      text={"Follow the most "}
      textBold={"successful traders strategies!"}
    />
  </ul>
);

const TabInfoList = React.memo(_TabInfoList);
export default TabInfoList;
