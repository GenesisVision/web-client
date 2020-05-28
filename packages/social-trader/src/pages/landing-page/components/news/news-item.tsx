import { PlatformNews } from "gv-api-web";
import { useTranslation } from "i18n";
import React from "react";

import styles from "./news-list.module.scss";

const _NewsItem: React.FC<PlatformNews> = ({ title, body, isHot, url }) => {
  const { t } = useTranslation();
  return (
    <li className={styles["news-list__item"]}>
      <a
        title={title}
        href={url}
        className={styles["news-list__item-link"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles["news-list__item-title"]}>
          {isHot && (
            <span className={styles["news-list__item-tag"]}>
              {t("landing-page:tag-hot")}
            </span>
          )}
          {title}
        </div>
        <div className={styles["news-list__item-text"]}>{body}</div>
      </a>
    </li>
  );
};
const NewsItem = React.memo(_NewsItem);
export default NewsItem;
