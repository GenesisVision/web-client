import { FollowDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import FollowsList from "pages/landing-page/components/follows/follows-list";
import { JoinButton } from "pages/landing-page/components/join-button";
import React from "react";
import { GV_FOLLOW_ROUTE } from "routes/invest.routes";

import styles from "./follows-container.module.scss";

interface Props {
  follows: FollowDetailsListItem[];
}

const _FollowsContainer: React.FC<Props> = ({ follows }) => {
  const { t } = useTranslation();
  if (!follows.length) return null;
  return (
    <div className={styles["follows-container"]}>
      <div className={styles["follows-container__info"]}>
        <div className={styles["follows-container__wrapper-fixed"]}>
          <h2 className={styles["follows-container__title"]}>
            {t("landing-page:follows.title")}
          </h2>
          <p className={styles["follows-container__text"]}>
            {t("landing-page:follows.text")}
          </p>
          <JoinButton
            eventLabel={t("landing-page:buttons.discover")}
            href={GV_FOLLOW_ROUTE}
          >
            {t("landing-page:buttons.discover")}
          </JoinButton>
        </div>
      </div>
      <FollowsList
        follows={follows}
        className={styles["follows-container__list"]}
      />
    </div>
  );
};
const FollowsContainer = React.memo(_FollowsContainer);
export default FollowsContainer;
