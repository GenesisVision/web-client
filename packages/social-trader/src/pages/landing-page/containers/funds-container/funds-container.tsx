import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { FundDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import FundsList from "pages/landing-page/components/funds/funds-list";
import { JoinButton } from "pages/landing-page/components/join-button";
import FundsIcon from "pages/landing-page/images/common/funds-icon.svg";
import React, { useCallback, useRef, useState } from "react";
import { FUNDS_ROUTE } from "routes/funds.routes";

import styles from "./funds-container.module.scss";

interface Props {
  funds: FundDetailsListItem[];
}

const _FundsContainer: React.FC<Props> = ({ funds }) => {
  const { t } = useTranslation();
  const animate = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  const handleScroll = useCallback(
    posFirstItemLeft => {
      if (animate.current) {
        const posAnimate = animate.current.getBoundingClientRect();
        setHide(posAnimate.right > posFirstItemLeft);
      }
    },
    [animate.current]
  );

  if (!funds.length) return null;
  return (
    <div className={styles["funds-container"]}>
      <div
        className={classNames(styles["funds-container__info"], {
          [styles["funds-container__info--hide"]]: hide,
          [styles["funds-container__info--show"]]: !hide
        })}
        ref={animate}
      >
        <ImageBaseElement
          src={FundsIcon}
          alt={t("landing-page:funds.title")}
          className={styles["funds-container__img"]}
        />
        <h2 className={styles["funds-container__title"]}>
          {t("landing-page:funds.title")}
        </h2>
        <p className={styles["funds-container__text"]}>
          {t("landing-page:funds.text")}
        </p>
        <JoinButton
          eventLabel={t("landing-page:buttons.discover")}
          href={FUNDS_ROUTE}
        >
          {t("landing-page:buttons.discover")}
        </JoinButton>
      </div>
      <FundsList
        funds={funds}
        className={styles["funds-container__list"]}
        onScroll={handleScroll}
      />
    </div>
  );
};

const FundsContainer = React.memo(_FundsContainer);
export default FundsContainer;
