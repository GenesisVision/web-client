import "./news-list.scss";

import classNames from "classnames";
import { PlatformNews } from "gv-api-web";
import NewsItem from "pages/landing-page/components/news/news-item";
import React from "react";

interface Props {
  className?: string;
  newsItems: Array<PlatformNews>;
}

const _NewsList: React.FC<Props> = ({ className, newsItems }) => (
  <ul className={classNames("news-list", className)}>
    {newsItems.map((item, index) => (
      <NewsItem key={index} {...item} />
    ))}
  </ul>
);

const NewsList = React.memo(_NewsList);
export default NewsList;
