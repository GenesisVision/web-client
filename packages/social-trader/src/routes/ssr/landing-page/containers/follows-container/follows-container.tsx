import "./follows-container.scss";

import { FollowDetailsListItem } from "gv-api-web";
import React from "react";
import { GV_FOLLOW_ROUTE } from "routes/invest.routes";
import FollowsList from "routes/ssr/landing-page/components/follows/follows-list";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";

interface Props {
  follows: FollowDetailsListItem[];
}

const _FollowsContainer: React.FC<Props> = ({ follows }) => {
  if (!follows.length) return null;
  return (
    <div className="follows-container">
      <div className="follows-container__info">
        <div className="follows-container__wrapper-fixed">
          <h2 className="follows-container__title">Follow</h2>
          <p className="follows-container__text">
            Leverage the expertise of seasoned traders while keeping control of
            your capital. Just choose a program and Genesis Vision will
            automatically copy the trades from your account. You will be able to
            withdraw your investment or exit trades at any point in time.
          </p>
          <LPButton href={GV_FOLLOW_ROUTE}>Discover</LPButton>
        </div>
      </div>
      <FollowsList follows={follows} className="follows-container__list" />
    </div>
  );
};
const FollowsContainer = React.memo(_FollowsContainer);
export default FollowsContainer;
