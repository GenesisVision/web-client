import "./follows-container.scss";

import { FollowDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import FollowsList from "pages/landing-page/components/follows/follows-list";
import { JoinButton } from "pages/landing-page/components/join-button";
import React from "react";
import { GV_FOLLOW_ROUTE } from "routes/invest.routes";

interface Props {
  follows: FollowDetailsListItem[];
}

const _FollowsContainer: React.FC<Props> = ({ follows }) => {
  const { t } = useTranslation();
  if (!follows.length) return null;
  return (
    <div className="follows-container">
      <div className="follows-container__info">
        <div className="follows-container__wrapper-fixed">
          <h2 className="follows-container__title">
            {t("landing-page.follows.title")}
          </h2>
          <p className="follows-container__text">
            {t("landing-page.follows.text")}
          </p>
          <JoinButton
            eventLabel={t("landing-page.buttons.discover")}
            href={GV_FOLLOW_ROUTE}
          >
            {t("landing-page.buttons.discover")}
          </JoinButton>
        </div>
      </div>
      <FollowsList follows={follows} className="follows-container__list" />
    </div>
  );
};
const FollowsContainer = React.memo(_FollowsContainer);
export default FollowsContainer;
