import "./news-list.scss";

import classNames from "classnames";
import { PlatformNews } from "gv-api-web";
import React from "react";
import NewsItem from "routes/ssr/landing-page/components/news/news-item";

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
