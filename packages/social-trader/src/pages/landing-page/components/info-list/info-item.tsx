import clsx from "clsx";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import { JoinButton } from "pages/landing-page/components/join-button";
import { TInfoItem } from "pages/landing-page/static-data/info";
import React from "react";

import styles from "./info-list.module.scss";

const _InfoItem: React.FC<TInfoItem> = ({ texts, image, button }) => {
  const { t } = useTranslation();
  return (
    <li
      className={clsx(styles["info-list__item"], {
        [styles["info-list__item--bg-transparent"]]: image
      })}
    >
      {image && (
        <ImageBaseElement
          src={image}
          alt={t("navigation.trade")}
          className={styles["info-list__item-image"]}
        />
      )}
      {texts && (
        <div className={styles["info-list__item-text"]}>
          {texts.map((item, index) =>
            item.bold ? (
              <b key={index}>{t(item.text)}</b>
            ) : (
              <span key={index}>{t(item.text)}</span>
            )
          )}
        </div>
      )}
      {button && (
        <div className={styles["info-list__item-btn"]}>
          <JoinButton href={button.link}>{t(button.text)}</JoinButton>
        </div>
      )}
    </li>
  );
};
const InfoItem = React.memo(_InfoItem);
export default InfoItem;
