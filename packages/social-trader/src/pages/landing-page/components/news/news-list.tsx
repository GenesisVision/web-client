import { PlatformNews } from "gv-api-web";
import NewsItem from "pages/landing-page/components/news/news-item";
import React from "react";

import styles from "./news-list.module.scss";

interface Props {
  className?: string;
  newsItems: Array<PlatformNews>;
}

const _NewsList: React.FC<Props> = ({ newsItems }) => (
  <div className={styles["news-list-wrapper"]}>
    <ul className={styles["news-list"]}>
      {newsItems.map((item, index) => (
        <NewsItem key={index} {...item} />
      ))}
    </ul>
  </div>
);

const NewsList = React.memo(_NewsList);
export default NewsList;
