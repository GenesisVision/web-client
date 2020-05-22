import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import { TAdvantages } from "pages/landing-page/static-data/advantages";
import React from "react";

import styles from "./advantages-list.module.scss";

const _AdvantageItem: React.FC<TAdvantages> = ({ text, title, image }) => {
  const { t } = useTranslation();
  return (
    <li className={styles["advantages-list__item"]}>
      {image && (
        <ImageBaseElement
          src={image}
          alt={t(title)}
          className={styles["advantages-list__item-image"]}
        />
      )}
      <div className={styles["advantages-list__item-title"]}>{t(title)}</div>
      <p className={styles["advantages-list__item-text"]}>{t(text)}</p>
    </li>
  );
};
const AdvantageItem = React.memo(_AdvantageItem);
export default AdvantageItem;
