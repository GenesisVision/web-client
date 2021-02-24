import InvestPopupTop from "modules/invest-popup/invest-popup-top";
import React from "react";

export interface IFollowTop {
  title: string;
  header: string;
}

const _FollowTop: React.FC<IFollowTop> = ({ title: subtitle, header }) => {
  return <InvestPopupTop title={header} subtitle={subtitle} />;
};

const FollowTop = React.memo(_FollowTop);
export default FollowTop;
