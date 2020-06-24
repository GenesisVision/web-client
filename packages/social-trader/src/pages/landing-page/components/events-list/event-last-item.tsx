import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import LogoIcon from "pages/landing-page/images/logos/logo.svg";
import React from "react";
import { INVEST_ROUTE } from "routes/invest.routes";

import styles from "./events-list.module.scss";

const _EventLastItem: React.FC<Props> = ({ minHeight }) => {
  const { t } = useTranslation();
  return (
    <li
      className={classNames(
        styles["events-list__item"],
        styles["events-list__item--last"]
      )}
      style={{
        minHeight: `${minHeight}px`
      }}
    >
      <div className={styles["events-list__item-avatar"]}>
        <ImageBaseElement
          className={styles["events-list__item-image"]}
          src={LogoIcon}
          alt="Genesis Vision"
        />
      </div>
      <div className={styles["events-list__item-info"]}>
        <div className={styles["events-list__item-title"]}>Genesis Vision</div>
      </div>
      <div className={styles["events-list__item-button"]}>
        <JoinButton href={INVEST_ROUTE}>
          <>
            <span className={styles["events-list__only-mob"]}>
              {t("landing-page:buttons.join")}
            </span>
            <span className={styles["events-list__only-desktop"]}>
              {t("landing-page:buttons.discover")}
            </span>
          </>
        </JoinButton>
      </div>
    </li>
  );
};
interface Props {
  minHeight: number;
}

const EventLastItem = React.memo(_EventLastItem);
export default EventLastItem;
